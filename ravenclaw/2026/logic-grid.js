(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);

  function readConfig() {
    const node = $("#logicGridConfig");
    if (!node) throw new Error("Не найден блок #logicGridConfig.");
    return JSON.parse(node.textContent);
  }

  function validateConfig(config) {
    if (!config || !Array.isArray(config.people) || config.people.length === 0) {
      throw new Error("Добавьте хотя бы одного участника в people.");
    }
    if (!Array.isArray(config.categories) || config.categories.length === 0) {
      throw new Error("Добавьте хотя бы одну категорию в categories.");
    }

    const names = new Set();
    config.categories.forEach((category, index) => {
      if (!category.name || !Array.isArray(category.values) || category.values.length === 0) {
        throw new Error(`У категории №${index + 1} должны быть name и непустой массив values.`);
      }
      if (names.has(category.name)) throw new Error(`Название категории «${category.name}» повторяется.`);
      names.add(category.name);
      const values = new Set(category.values);
      if (values.size !== category.values.length) {
        throw new Error(`В категории «${category.name}» есть повторяющиеся варианты.`);
      }
    });
  }

  function makeCell(tag, text, className) {
    const cell = document.createElement(tag);
    if (text !== undefined && text !== null) cell.textContent = text;
    if (className) cell.className = className;
    return cell;
  }

  /*
   * Одна треугольная матрица:
   * - верхние столбцы содержат все категории;
   * - строки: участники, затем категории в обратном порядке (кроме первой);
   * - каждая строковая категория сравнивается только с предшествующими категориями.
   * Так каждая пара категорий встречается один раз, без отдельных таблиц.
   */
  function buildMarksTable(config) {
    const categories = config.categories;
    const table = document.createElement("table");
    table.className = "logic-table marks-table";
    table.setAttribute("aria-label", "Единая логическая таблица");

    const thead = document.createElement("thead");
    const groupRow = document.createElement("tr");
    const corner = makeCell("th", "", "corner-cell");
    corner.rowSpan = 2;
    corner.colSpan = 2;
    groupRow.append(corner);

    categories.forEach(category => {
      const th = makeCell("th", category.name, "category-group");
      th.colSpan = category.values.length;
      groupRow.append(th);
    });

    const valueRow = document.createElement("tr");
    categories.forEach(category => {
      category.values.forEach(value => {
        valueRow.append(makeCell("th", value, "vertical column-value"));
      });
    });
    thead.append(groupRow, valueRow);
    table.append(thead);

    const tbody = document.createElement("tbody");
    const rowGroups = [{
      name: config.peopleName || "Имя",
      values: config.people,
      categoryIndex: -1
    }];

    for (let i = categories.length - 1; i >= 1; i--) {
      rowGroups.push({
        name: categories[i].name,
        values: categories[i].values,
        categoryIndex: i
      });
    }

    rowGroups.forEach(group => {
      group.values.forEach((value, rowIndex) => {
        const tr = document.createElement("tr");
        if (rowIndex === 0) {
          const groupHeader = makeCell("th", group.name, "vertical row-group");
          groupHeader.rowSpan = group.values.length;
          tr.append(groupHeader);
        }
        tr.append(makeCell("th", value, "row-value"));

        const includedCategories = group.categoryIndex === -1
          ? categories.map((_, index) => index)
          : categories.map((_, index) => index).filter(index => index < group.categoryIndex);

        includedCategories.forEach(categoryIndex => {
          categories[categoryIndex].values.forEach(columnValue => {
            const cell = makeCell("td", "", "mark-cell");
            cell.tabIndex = 0;
            cell.setAttribute("role", "button");
            cell.setAttribute("aria-label", `${value} — ${categories[categoryIndex].name}: ${columnValue}. Отметка не установлена.`);
            cell.dataset.rowValue = value;
            cell.dataset.rowGroup = group.name;
            cell.dataset.category = categories[categoryIndex].name;
            cell.dataset.columnValue = columnValue;
            tr.append(cell);
          });
        });
        tbody.append(tr);
      });
    });

    table.append(tbody);
    return table;
  }

  function buildAnswersTable(config) {
    const table = document.createElement("table");
    table.className = "logic-table answers-table";
    table.setAttribute("aria-label", "Таблица ответов");

    const thead = document.createElement("thead");
    const header = document.createElement("tr");
    header.append(makeCell("th", config.peopleName || "Имя"));
    config.categories.forEach(category => header.append(makeCell("th", category.name)));
    thead.append(header);
    table.append(thead);

    const tbody = document.createElement("tbody");
    config.people.forEach(person => {
      const tr = document.createElement("tr");
      tr.append(makeCell("th", person, "answer-person"));
      config.categories.forEach(() => {
        const td = makeCell("td", "", "answer-cell");
        td.contentEditable = "true";
        td.setAttribute("role", "textbox");
        td.setAttribute("aria-label", `Ответ для ${person}`);
        td.dataset.placeholder = "Введите ответ";
        tr.append(td);
      });
      tbody.append(tr);
    });
    table.append(tbody);
    return table;
  }

  function render(config) {
  const container = document.getElementById("puzzlesContainer");

  container.replaceChildren();

  config.puzzles.forEach(puzzle => {
    validateConfig(puzzle);

    const puzzleBlock = createPuzzleBlock(puzzle);

    container.append(puzzleBlock);
  });
}

  function cycleMark(cell) {
  // 0 — пусто, 1 — красный, 2 — синий
  const current = cell.classList.contains("mark-red")
    ? 1
    : cell.classList.contains("mark-blue")
      ? 2
      : 0;

  const next = (current + 1) % 3;

  cell.classList.remove("mark-red", "mark-blue");

  if (next === 1) cell.classList.add("mark-red");
  if (next === 2) cell.classList.add("mark-blue");

  const stateLabel = next === 1
    ? "красная отметка"
    : next === 2
      ? "синяя отметка"
      : "отметка не установлена";
    cell.setAttribute("aria-label",
      `${cell.dataset.rowValue} — ${cell.dataset.category}: ${cell.dataset.columnValue}. ${stateLabel}.`);
  }

  function setupMarkInteraction() {
  const container = document.getElementById("puzzlesContainer");

  container.addEventListener("click", event => {
    const cell = event.target.closest(".mark-cell");

    if (cell && container.contains(cell)) {
      cycleMark(cell);
    }
  });

  container.addEventListener("keydown", event => {
    const cell = event.target.closest(".mark-cell");

    if (
      cell &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      cycleMark(cell);
    }
  });
}

  document.addEventListener("DOMContentLoaded", () => {
    try {
      const config = readConfig();
      render(config);
      setupMarkInteraction();
    } catch (error) {
      console.error(error);
      const message = document.createElement("p");
      message.className = "error-message";
      message.textContent = `Ошибка настройки задачи: ${error.message}`;
      $(".page").prepend(message);
    }
  });

  
function createPuzzleBlock(config) {
  const section = document.createElement("section");

  section.className = "puzzle-card";
  section.id = config.id;

  const title = document.createElement("h2");
  title.textContent = config.title || "Логическая задача";

  const description = document.createElement("p");
  description.textContent = config.description || "";

  const cluesTitle = document.createElement("h3");
  cluesTitle.textContent = "Условия";

  const cluesList = document.createElement("ol");

  (config.clues || []).forEach(clue => {
    const li = document.createElement("li");
    li.textContent = clue;
    cluesList.append(li);
  });

  const marksTitle = document.createElement("h3");
  marksTitle.textContent = "Логическая таблица";

  const marksContainer = document.createElement("div");
  marksContainer.className = "marks-container";

  const marksWrapper = document.createElement("div");
  marksWrapper.className = "logic-table-wrapper";
  marksWrapper.append(buildMarksTable(config));
  marksContainer.append(marksWrapper);

  const answersTitle = document.createElement("h3");
  answersTitle.textContent = "Таблица ответов";

  const answersContainer = document.createElement("div");
  answersContainer.className = "answers-container";

  const answersWrapper = document.createElement("div");
  answersWrapper.className = "logic-table-wrapper";
  answersWrapper.append(buildAnswersTable(config));
  answersContainer.append(answersWrapper);

  // Индивидуальная кнопка скриншота
  const screenshotButton = document.createElement("button");
  screenshotButton.type = "button";
  screenshotButton.className = "screenshot-button";
  screenshotButton.textContent = "Скачать скриншот";

  screenshotButton.addEventListener("click", () => {
    downloadPuzzleScreenshot(section, config.id, screenshotButton);
  });

  // Собираем секцию после создания всех элементов
  section.append(
    title,
    description,
    cluesTitle,
    cluesList,
    marksTitle,
    marksContainer,
    answersTitle,
    answersContainer,
    screenshotButton
  );

  return section;
}


async function downloadPuzzleScreenshot(section, puzzleId, button) {
  if (typeof window.html2canvas !== "function") {
    alert("Библиотека html2canvas не загружена. Проверь подключение к интернету.");
    return;
  }

  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = "Создаём скриншот...";

  try {
    const canvas = await window.html2canvas(section, {
      scale: 2,
      backgroundColor: "#f7f1e5",
      useCORS: true,
      onclone: clonedDocument => {
        const clonedSection = clonedDocument.getElementById(puzzleId);

        if (clonedSection) {
          clonedSection.style.width = "max-content";
          clonedSection.style.maxWidth = "none";
          const clonedButton = clonedSection.querySelector(".screenshot-button");
          if (clonedButton) clonedButton.style.display = "none";
        }

        clonedDocument
          .querySelectorAll(`#${CSS.escape(puzzleId)} .logic-table-wrapper`)
          .forEach(wrapper => {
            wrapper.style.overflow = "visible";
            wrapper.style.width = "max-content";
            wrapper.style.maxWidth = "none";
          });
      }
    });

    const link = document.createElement("a");
    link.download = `${puzzleId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

  } catch (error) {
    console.error("Ошибка создания скриншота:", error);
    alert("Не удалось создать скриншот.");
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
}


})();
