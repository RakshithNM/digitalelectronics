const variableNames = ["A", "B", "C", "D", "E", "F"];
const groupPalette = [
  "#d76634",
  "#1f6b69",
  "#8864d9",
  "#c94b71",
  "#4a8b2c",
  "#2576b8",
];

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

const presetCatalog = {
  2: [
    {
      key: "starter",
      label: "Pair",
      ones: [0, 1],
      dontCares: [],
      message: "Start with a simple adjacent pair. One changing variable drops out of the term.",
    },
    {
      key: "block",
      label: "Full map",
      ones: [0, 1, 2, 3],
      dontCares: [],
      message: "A full 2-variable map simplifies all the way to the constant 1.",
    },
    {
      key: "wrap",
      label: "Edge pair",
      ones: [0, 2],
      dontCares: [],
      message: "In a 2x2 K-map, the top and bottom of a column are adjacent.",
    },
    {
      key: "dontcare",
      label: "Don't care",
      ones: [0, 1, 2],
      dontCares: [3],
      message: "The don't-care lets the three marked cells expand into a full-map group.",
    },
    {
      key: "checker",
      label: "Two terms",
      ones: [0, 1, 2],
      dontCares: [],
      message: "Overlapping pairs are valid when they produce a shorter final SOP expression.",
    },
  ],
  3: [
    {
      key: "starter",
      label: "Pair",
      ones: [0, 1],
      dontCares: [],
      message: "A 3-variable pair still removes exactly one changing variable.",
    },
    {
      key: "block",
      label: "Quad",
      ones: [0, 1, 2, 3],
      dontCares: [],
      message: "A quad in a 3-variable map collapses the expression to a single literal.",
    },
    {
      key: "largest",
      label: "Octet",
      ones: range(0, 7),
      dontCares: [],
      message: "When every cell is 1, the minimized result is simply 1.",
    },
    {
      key: "wrap",
      label: "Wrap",
      ones: [0, 2, 4, 6],
      dontCares: [],
      message: "The first and last Gray-code columns are adjacent, so the group can wrap across the edge.",
    },
    {
      key: "dontcare",
      label: "Don't care",
      ones: [0, 1, 2],
      dontCares: [3],
      message: "A single don't-care can turn a partial row into a full quad.",
    },
    {
      key: "checker",
      label: "Two terms",
      ones: [0, 1, 6, 7],
      dontCares: [],
      message: "Separate pairs often lead to a clean two-term SOP expression.",
    },
  ],
  4: [
    {
      key: "starter",
      label: "Pair",
      ones: [0, 1],
      dontCares: [],
      message: "A pair removes the variable that changes between the two cells.",
    },
    {
      key: "block",
      label: "Quad",
      ones: [0, 1, 2, 3],
      dontCares: [],
      message: "A quad keeps only the variables that stay fixed across four cells.",
    },
    {
      key: "largest",
      label: "Octet",
      ones: range(0, 7),
      dontCares: [],
      message: "An octet in a 4-variable map collapses the expression to one literal.",
    },
    {
      key: "wrap",
      label: "Wrap",
      ones: [0, 2, 8, 10],
      dontCares: [],
      message: "Opposite edges are adjacent, so these corner-side cells can still form a valid quad.",
    },
    {
      key: "dontcare",
      label: "Don't care",
      ones: [0, 1, 2],
      dontCares: [3],
      message: "The don't-care cell extends the group into a quad and removes one more literal.",
    },
    {
      key: "checker",
      label: "Two terms",
      ones: [0, 2, 5, 7, 8, 10, 13, 15],
      dontCares: [],
      message: "Two larger groups can cover alternating structure more efficiently than many small ones.",
    },
  ],
  5: [
    {
      key: "starter",
      label: "Pair",
      ones: [0, 1],
      dontCares: [],
      message: "A 5-variable pair still removes one changing variable in the taller 8x4 map.",
    },
    {
      key: "block",
      label: "Quad",
      ones: [0, 1, 2, 3],
      dontCares: [],
      message: "A four-cell block in the 8x4 map still removes two changing variables.",
    },
    {
      key: "largest",
      label: "16-cell",
      ones: range(0, 15),
      dontCares: [],
      message: "A 16-cell band in the 8x4 map removes four varying variables at once.",
    },
    {
      key: "wrap",
      label: "Wrap",
      ones: [...range(0, 3), ...range(16, 19)],
      dontCares: [],
      message: "The top and bottom rows of the 8x4 Gray-code map are adjacent, so the group can wrap vertically.",
    },
    {
      key: "dontcare",
      label: "Don't care",
      ones: range(0, 6),
      dontCares: [7],
      message: "The don't-care completes an octet in the 8x4 map and removes another literal.",
    },
    {
      key: "checker",
      label: "Two terms",
      ones: [...range(0, 3), ...range(12, 15), ...range(16, 19), ...range(28, 31)],
      dontCares: [],
      message: "Two larger regions in the 5-variable map can still simplify to a compact two-term SOP.",
    },
  ],
  6: [
    {
      key: "starter",
      label: "Pair",
      ones: [0, 1],
      dontCares: [],
      message: "Even in an 8x8 6-variable map, the smallest useful grouping is still a pair.",
    },
    {
      key: "block",
      label: "Quad",
      ones: [0, 1, 2, 3],
      dontCares: [],
      message: "A four-cell block in the 8x8 map removes two changing variables.",
    },
    {
      key: "largest",
      label: "16-cell",
      ones: range(0, 15),
      dontCares: [],
      message: "A 16-cell band in the 8x8 map removes four varying variables at once.",
    },
    {
      key: "wrap",
      label: "Wrap",
      ones: [...range(0, 3), ...range(32, 35)],
      dontCares: [],
      message: "The first and last Gray-code rows are adjacent, so the group can wrap across the top and bottom edges.",
    },
    {
      key: "dontcare",
      label: "Don't care",
      ones: [0, 1, 2, 3, 8, 9, 10],
      dontCares: [11],
      message: "The don't-care completes an 8-cell block in the 8x8 map and removes another literal.",
    },
    {
      key: "checker",
      label: "Two terms",
      ones: [
        ...range(0, 3),
        ...range(12, 15),
        ...range(16, 19),
        ...range(28, 31),
        ...range(32, 35),
        ...range(44, 47),
        ...range(48, 51),
        ...range(60, 63),
      ],
      dontCares: [],
      message: "Two larger regions in the 8x8 map can still collapse to a short two-term SOP expression.",
    },
  ],
};

function grayOrder(bitCount) {
  if (bitCount === 0) {
    return [""];
  }

  if (bitCount === 1) {
    return ["0", "1"];
  }

  const previousOrder = grayOrder(bitCount - 1);
  return [
    ...previousOrder.map((entry) => `0${entry}`),
    ...[...previousOrder].reverse().map((entry) => `1${entry}`),
  ];
}

function getVariableSplit(variableCount) {
  if (variableCount === 2) {
    return { panelBits: 0, rowBits: 1, colBits: 1 };
  }

  if (variableCount === 3) {
    return { panelBits: 0, rowBits: 1, colBits: 2 };
  }

  if (variableCount === 4) {
    return { panelBits: 0, rowBits: 2, colBits: 2 };
  }

  if (variableCount === 5) {
    return { panelBits: 0, rowBits: 3, colBits: 2 };
  }

  return { panelBits: 0, rowBits: 3, colBits: 3 };
}

function buildLayout(variableCount) {
  const { panelBits, rowBits, colBits } = getVariableSplit(variableCount);
  const variables = variableNames.slice(0, variableCount);
  const panelVars = variables.slice(0, panelBits);
  const rowVars = variables.slice(panelBits, panelBits + rowBits);
  const colVars = variables.slice(panelBits + rowBits);
  const panelLabels = grayOrder(panelBits);
  const rowLabels = grayOrder(rowBits);
  const colLabels = grayOrder(colBits);
  const cells = [];

  panelLabels.forEach((panelLabel, panelIndex) => {
    rowLabels.forEach((rowLabel, rowIndex) => {
      colLabels.forEach((colLabel, colIndex) => {
        const bits = `${panelLabel}${rowLabel}${colLabel}`;
        const minterm = Number.parseInt(bits || "0", 2);

        cells.push({
          minterm,
          bits,
          panelIndex,
          rowIndex,
          colIndex,
        });
      });
    });
  });

  return {
    variableCount,
    variables,
    panelVars,
    rowVars,
    colVars,
    panelLabels,
    rowLabels,
    colLabels,
    panelCount: panelLabels.length,
    panelColumns: panelLabels.length === 4 ? 2 : panelLabels.length,
    totalCells: 1 << variableCount,
    cells,
  };
}

function getPresetsForCount(variableCount) {
  return presetCatalog[variableCount] ?? presetCatalog[4];
}

const state = {
  variableCount: 4,
  layout: buildLayout(4),
  cells: Array(16).fill("0"),
  selectedGroup: null,
  lastMessage: "Select a map size or load a preset to start simplifying.",
  cellElements: new Map(),
};

function cycleCell(value) {
  if (value === "0") {
    return "1";
  }

  if (value === "1") {
    return "X";
  }

  return "0";
}

function formatList(values) {
  return values.length ? values.join(", ") : "none";
}

function popcount(number) {
  let value = number;
  let count = 0;

  while (value > 0) {
    count += value & 1;
    value >>= 1;
  }

  return count;
}

function mintermsForValue(cells, value) {
  return cells.flatMap((cellValue, minterm) => (cellValue === value ? [minterm] : []));
}

function toBigMask(minterms) {
  return minterms.reduce((mask, minterm) => mask | (1n << BigInt(minterm)), 0n);
}

function uncoveredMinterms(mask, totalCells) {
  const minterms = [];

  for (let minterm = 0; minterm < totalCells; minterm += 1) {
    if (mask & (1n << BigInt(minterm))) {
      minterms.push(minterm);
    }
  }

  return minterms;
}

function compareCost(left, right) {
  if (!right) {
    return left;
  }

  const leftTuple = [left.count, left.literals, left.areaPenalty, left.termPenalty];
  const rightTuple = [right.count, right.literals, right.areaPenalty, right.termPenalty];

  for (let index = 0; index < leftTuple.length; index += 1) {
    if (leftTuple[index] < rightTuple[index]) {
      return left;
    }

    if (leftTuple[index] > rightTuple[index]) {
      return right;
    }
  }

  return left;
}

function termFromImplicant(implicant, variableCount, form) {
  const constantVars = [];
  const varyingVars = [];

  for (let variableIndex = 0; variableIndex < variableCount; variableIndex += 1) {
    const bitMask = 1 << (variableCount - variableIndex - 1);
    const variableName = variableNames[variableIndex];

    if (implicant.mask & bitMask) {
      varyingVars.push(variableName);
      continue;
    }

    if (form === "pos") {
      constantVars.push(implicant.value & bitMask ? `${variableName}'` : variableName);
    } else {
      constantVars.push(implicant.value & bitMask ? variableName : `${variableName}'`);
    }
  }

  const term =
    form === "pos"
      ? constantVars.length
        ? constantVars.length === 1
          ? constantVars[0]
          : `(${constantVars.join(" + ")})`
        : "0"
      : constantVars.length
        ? constantVars.join("")
        : "1";

  return {
    term,
    literalCount: constantVars.length,
    constantVars,
    varyingVars,
  };
}

function buildPrimeImplicants(
  cells,
  variableCount,
  targetMinterms,
  dontCareMinterms,
  targetValue,
  form,
) {
  const totalMask = (1 << variableCount) - 1;
  let current = [...new Set([...targetMinterms, ...dontCareMinterms])]
    .sort((left, right) => left - right)
    .map((minterm) => ({ value: minterm, mask: 0 }));
  const primes = new Map();

  while (current.length) {
    current = current.map((term) => ({ ...term, combined: false }));
    const nextMap = new Map();

    for (let leftIndex = 0; leftIndex < current.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < current.length; rightIndex += 1) {
        const left = current[leftIndex];
        const right = current[rightIndex];

        if (left.mask !== right.mask) {
          continue;
        }

        const diff = left.value ^ right.value;
        if (!diff || (diff & (diff - 1)) !== 0 || (diff & left.mask) !== 0) {
          continue;
        }

        const combined = {
          value: left.value & (totalMask ^ diff),
          mask: left.mask | diff,
        };
        const key = `${combined.value}|${combined.mask}`;

        if (!nextMap.has(key)) {
          nextMap.set(key, combined);
        }

        current[leftIndex].combined = true;
        current[rightIndex].combined = true;
      }
    }

    current.forEach((term) => {
      if (!term.combined) {
        primes.set(`${term.value}|${term.mask}`, {
          value: term.value,
          mask: term.mask,
        });
      }
    });

    current = [...nextMap.values()];
  }

  return [...primes.values()]
    .map((implicant) => {
      const fixedMask = totalMask ^ implicant.mask;
      const allMatches = [];
      const targetMatches = [];
      const dontCareMatches = [];

      for (let minterm = 0; minterm < cells.length; minterm += 1) {
        if ((minterm & fixedMask) !== (implicant.value & fixedMask)) {
          continue;
        }

        if (cells[minterm] !== targetValue && cells[minterm] !== "X") {
          continue;
        }

        allMatches.push(minterm);

        if (cells[minterm] === targetValue) {
          targetMatches.push(minterm);
        } else if (cells[minterm] === "X") {
          dontCareMatches.push(minterm);
        }
      }

      return {
        ...implicant,
        fixedMask,
        cellCount: 1 << popcount(implicant.mask),
        allMatches,
        targetMinterms: targetMatches,
        dontCareMatches,
        coverMask: toBigMask(targetMatches),
        ...termFromImplicant(implicant, variableCount, form),
      };
    })
    .filter((implicant) => implicant.targetMinterms.length > 0);
}

function pickBestCover(primes, onesMask, coveredMask, totalCells) {
  const memo = new Map();

  function search(currentMask) {
    if (currentMask === onesMask) {
      return {
        indices: [],
        count: 0,
        literals: 0,
        areaPenalty: 0,
        termPenalty: 0,
      };
    }

    const memoKey = currentMask.toString();
    if (memo.has(memoKey)) {
      return memo.get(memoKey);
    }

    const remainingMask = onesMask & ~currentMask;
    const uncovered = uncoveredMinterms(remainingMask, totalCells);
    let targetOptions = [];

    for (const minterm of uncovered) {
      const options = primes
        .map((prime, index) => ({ prime, index }))
        .filter(({ prime }) => (prime.coverMask & (1n << BigInt(minterm))) !== 0n);

      if (!targetOptions.length || options.length < targetOptions.length) {
        targetOptions = options;
      }
    }

    if (!targetOptions.length) {
      memo.set(memoKey, null);
      return null;
    }

    let best = null;

    for (const { prime, index } of targetOptions) {
      const result = search(currentMask | prime.coverMask);
      if (!result) {
        continue;
      }

      const candidate = {
        indices: [index, ...result.indices],
        count: 1 + result.count,
        literals: prime.literalCount + result.literals,
        areaPenalty: result.areaPenalty - prime.cellCount,
        termPenalty: result.termPenalty + prime.term.length,
      };

      best = compareCost(candidate, best);
    }

    memo.set(memoKey, best);
    return best;
  }

  return search(coveredMask);
}

function solveForm(cells, variableCount, form) {
  const targetValue = form === "pos" ? "0" : "1";
  const targetMinterms = mintermsForValue(cells, targetValue);
  const dontCareMinterms = mintermsForValue(cells, "X");
  const signature = variableNames.slice(0, variableCount).join(",");

  if (!targetMinterms.length) {
    return {
      expression: form === "pos" ? "1" : "0",
      canonical: `F(${signature}) = ${form === "pos" ? "1" : "0"}`,
      groups: [],
      targetMinterms,
      dontCareMinterms,
      caption:
        form === "pos"
          ? "No 0-cells are selected, so the output stays high for every minterm."
          : "No 1-cells are selected, so the output stays low for every minterm.",
      form,
    };
  }

  const primes = buildPrimeImplicants(
    cells,
    variableCount,
    targetMinterms,
    dontCareMinterms,
    targetValue,
    form,
  );
  const targetMask = toBigMask(targetMinterms);
  const essentialIndices = new Set();

  for (const minterm of targetMinterms) {
    const covering = primes
      .map((prime, index) => ({ prime, index }))
      .filter(({ prime }) => (prime.coverMask & (1n << BigInt(minterm))) !== 0n);

    if (covering.length === 1) {
      essentialIndices.add(covering[0].index);
    }
  }

  let coveredMask = 0n;
  const selectedPrimes = [...essentialIndices].map((index) => primes[index]);

  selectedPrimes.forEach((prime) => {
    coveredMask |= prime.coverMask;
  });

  if (coveredMask !== targetMask) {
    const remainingPrimes = primes.filter((_, index) => !essentialIndices.has(index));
    const bestRemainder = pickBestCover(remainingPrimes, targetMask, coveredMask, cells.length);

    if (bestRemainder) {
      bestRemainder.indices.forEach((index) => {
        selectedPrimes.push(remainingPrimes[index]);
      });
    }
  }

  const uniqueGroups = [...new Map(
    selectedPrimes.map((group) => [`${group.value}|${group.mask}`, group]),
  ).values()]
    .sort((left, right) => right.cellCount - left.cellCount || left.term.localeCompare(right.term))
    .map((group, index) => ({
      ...group,
      color: groupPalette[index % groupPalette.length],
    }));

  const expression = uniqueGroups
    .map((group) => group.term)
    .join(form === "pos" ? " · " : " + ");
  const canonicalParts = [
    form === "pos"
      ? `F(${signature}) = ΠM(${targetMinterms.join(", ")})`
      : `F(${signature}) = Σm(${targetMinterms.join(", ")})`,
  ];

  if (dontCareMinterms.length) {
    canonicalParts.push(`+ d(${dontCareMinterms.join(", ")})`);
  }

  const caption =
    form === "pos" && expression === "0"
      ? "Every cell is covered by 0-groups, so the minimized POS result is the constant 0."
      : form === "sop" && expression === "1"
        ? "Every cell is covered by 1-groups, so the minimized SOP result is the constant 1."
        : `${uniqueGroups.length} group${uniqueGroups.length === 1 ? "" : "s"} cover all ${targetValue}-cells with the fewest literals. Click a group to highlight it on the map.`;

  return {
    expression,
    canonical: canonicalParts.join(" "),
    groups: uniqueGroups,
    targetMinterms,
    dontCareMinterms,
    caption,
    form,
  };
}

function simplify(cells, variableCount) {
  return solveForm(cells, variableCount, "sop");
}

function groupKind(group, totalCells) {
  if (group.term === "1" || group.cellCount === totalCells) {
    return "Full map";
  }

  if (group.cellCount === 1) {
    return "Single";
  }

  if (group.cellCount === 2) {
    return "Pair";
  }

  if (group.cellCount === 4) {
    return "Quad";
  }

  if (group.cellCount === 8) {
    return "Octet";
  }

  return `${group.cellCount}-cell`;
}

function groupExplanation(group, form) {
  if (form === "pos" && group.term === "0") {
    return "No variable stays fixed across the selected 0-group, so the function simplifies to 0.";
  }

  if (form === "sop" && group.term === "1") {
    return "No variable stays fixed across the selected 1-group, so the function simplifies to 1.";
  }

  if (!group.varyingVars.length) {
    return form === "pos"
      ? "This group is a single maxterm, so every variable stays fixed and every literal remains in the sum term."
      : "This group is a single minterm, so every variable stays fixed and every literal remains.";
  }

  const fixedText = group.constantVars.join(", ");
  const varyingText = group.varyingVars.join(" and ");
  return form === "pos"
    ? `${fixedText} stay fixed while ${varyingText} change inside the 0-group, so only the fixed literals remain in the sum term.`
    : `${fixedText} stay fixed while ${varyingText} change inside the 1-group, so only the fixed literals remain in the product term.`;
}

function layoutLegendMarkup(layout) {
  const parts = [];

  if (layout.panelVars.length) {
    parts.push(`Panels: <strong>${layout.panelVars.join("")}</strong> in Gray order.`);
  }

  parts.push(`Rows: <strong>${layout.rowVars.join("")}</strong> in Gray order.`);
  parts.push(`Columns: <strong>${layout.colVars.join("")}</strong> in Gray order.`);

  return parts.join(" ");
}

function layoutMessage(layout) {
  if (!layout.panelVars.length) {
    return `This ${layout.variableCount}-input map uses one Gray-code grid. Focus on row and column adjacency first.`;
  }

  return `This ${layout.variableCount}-input map uses linked panels for ${layout.panelVars.join("")}. Matching cells in adjacent panels can belong to the same group.`;
}

function panelLabel(layout, panelIndex) {
  if (!layout.panelVars.length) {
    return "";
  }

  return `${layout.panelVars.join("")} = ${layout.panelLabels[panelIndex]}`;
}

function updateLayoutClasses() {
  const isWideMap =
    state.layout.panelCount > 1 ||
    state.layout.rowLabels.length > 4 ||
    state.layout.colLabels.length > 4;
  document.querySelector(".studio-layout").classList.toggle("is-multi-panel", isWideMap);
  document.querySelector(".map-panel").classList.toggle("is-multi-panel", isWideMap);
  document.getElementById("kmap-stage").classList.toggle("is-multi-panel", isWideMap);
}

function renderVariableControls() {
  document.querySelectorAll("[data-variable-count]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      Number.parseInt(button.dataset.variableCount, 10) === state.variableCount,
    );
  });
}

function renderPresetControls() {
  const presetGroup = document.getElementById("preset-group");
  const label = document.createElement("span");
  label.className = "toolbar-label";
  label.textContent = "Presets";

  const row = document.createElement("div");
  row.className = "chip-row";

  getPresetsForCount(state.variableCount).forEach((preset) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "chip";
    button.dataset.preset = preset.key;
    button.textContent = preset.label;
    row.append(button);
  });

  presetGroup.replaceChildren(label, row);
}

function createCellButton(cell) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "kmap-cell";
  button.dataset.minterm = String(cell.minterm);
  button.innerHTML = `
    <span class="cell-minterm">m${cell.minterm}</span>
    <span class="cell-state"></span>
    <span class="cell-bits">${cell.bits}</span>
  `;
  state.cellElements.set(cell.minterm, button);
  return button;
}

function buildStage() {
  const stage = document.getElementById("kmap-stage");
  stage.replaceChildren();
  state.cellElements = new Map();

  const panelGrid = document.createElement("div");
  panelGrid.className = "panel-grid";
  panelGrid.style.setProperty("--panel-columns", String(state.layout.panelColumns));

  state.layout.panelLabels.forEach((_, panelIndex) => {
    const board = document.createElement("section");
    board.className = "map-board";

    if (state.layout.panelCount > 1) {
      const header = document.createElement("div");
      header.className = "map-board-header";

      const badge = document.createElement("p");
      badge.className = "panel-badge";
      badge.textContent = panelLabel(state.layout, panelIndex);
      header.append(badge);
      board.append(header);
    }

    const grid = document.createElement("div");
    grid.className = "kmap-grid";
    grid.style.setProperty("--map-cols", String(state.layout.colLabels.length));
    grid.style.setProperty(
      "--axis-size",
      state.layout.colLabels.length === 4 ? "84px" : "68px",
    );

    const corner = document.createElement("div");
    corner.className = "corner-cell";
    corner.innerHTML = `<span>${state.layout.colVars.join("")}</span><span>${state.layout.rowVars.join("")}</span>`;
    grid.append(corner);

    state.layout.colLabels.forEach((label) => {
      const axisCell = document.createElement("div");
      axisCell.className = "axis-cell";
      axisCell.textContent = label;
      grid.append(axisCell);
    });

    state.layout.rowLabels.forEach((rowLabel, rowIndex) => {
      const rowCell = document.createElement("div");
      rowCell.className = "axis-cell";
      rowCell.textContent = rowLabel;
      grid.append(rowCell);

      state.layout.colLabels.forEach((_, colIndex) => {
        const cell = state.layout.cells.find(
          (entry) =>
            entry.panelIndex === panelIndex &&
            entry.rowIndex === rowIndex &&
            entry.colIndex === colIndex,
        );
        grid.append(createCellButton(cell));
      });
    });

    board.append(grid);
    panelGrid.append(board);
  });

  stage.append(panelGrid);
}

function updateLayoutCopy() {
  document.getElementById("map-type-label").textContent = `${state.variableCount}-Input Karnaugh Map`;
  document.getElementById("map-title").innerHTML =
    'Click a cell to cycle through <span>0</span>, <span>1</span>, and <span>X</span>.';
  document.getElementById("map-legend").innerHTML = layoutLegendMarkup(state.layout);
}

function render() {
  const sopSolution = solveForm(state.cells, state.variableCount, "sop");
  const posSolution = solveForm(state.cells, state.variableCount, "pos");
  const zeroMinterms = mintermsForValue(state.cells, "0");

  if (
    state.selectedGroup !== null &&
    state.selectedGroup.index >=
      (state.selectedGroup.form === "pos" ? posSolution.groups.length : sopSolution.groups.length)
  ) {
    state.selectedGroup = null;
  }

  const activeGroup =
    state.selectedGroup !== null
      ? state.selectedGroup.form === "pos"
        ? posSolution.groups[state.selectedGroup.index]
        : sopSolution.groups[state.selectedGroup.index]
      : null;

  state.layout.cells.forEach((cell) => {
    const button = state.cellElements.get(cell.minterm);
    const value = state.cells[cell.minterm];

    button.classList.remove("state-0", "state-1", "state-x", "is-active-group");
    button.classList.add(`state-${value.toLowerCase()}`);

    if (activeGroup && activeGroup.allMatches.includes(cell.minterm)) {
      button.classList.add("is-active-group");
      button.style.setProperty("--group-accent", activeGroup.color);
    } else {
      button.style.removeProperty("--group-accent");
    }

    button.querySelector(".cell-state").textContent = value;
    button.setAttribute(
      "aria-label",
      `Minterm ${cell.minterm}, bits ${cell.bits}, current value ${value}`,
    );
  });

  document.getElementById("simplified-sop-expression").textContent = `F = ${sopSolution.expression}`;
  document.getElementById("simplified-pos-expression").textContent = `F = ${posSolution.expression}`;
  document.getElementById("expression-caption").textContent =
    `${sopSolution.caption} ${posSolution.caption}`;
  document.getElementById("minterm-list").textContent = formatList(sopSolution.targetMinterms);
  document.getElementById("maxterm-list").textContent = formatList(zeroMinterms);
  document.getElementById("dontcare-list").textContent = formatList(sopSolution.dontCareMinterms);
  document.getElementById("canonical-sop-expression").textContent = sopSolution.canonical;
  document.getElementById("canonical-pos-expression").textContent = posSolution.canonical;
  document.getElementById("challenge-copy").textContent = state.lastMessage;

  const groupList = document.getElementById("group-list");
  groupList.replaceChildren();

  if (!sopSolution.groups.length && !posSolution.groups.length) {
    const emptyCard = document.createElement("article");
    emptyCard.className = "challenge-card";
    emptyCard.innerHTML =
      '<p class="summary-label">Group breakdown</p><p>No SOP or POS groups yet. Add some defined 1-cells or 0-cells.</p>';
    groupList.append(emptyCard);
    return;
  }

  [
    {
      form: "sop",
      title: "SOP group breakdown",
      notation: "m",
      solution: sopSolution,
    },
    {
      form: "pos",
      title: "POS group breakdown",
      notation: "M",
      solution: posSolution,
    },
  ].forEach(({ form, title, notation, solution }) => {
    const section = document.createElement("article");
    section.className = "challenge-card";

    const heading = document.createElement("p");
    heading.className = "summary-label";
    heading.textContent = title;
    section.append(heading);

    if (!solution.groups.length) {
      const emptyCopy = document.createElement("p");
      emptyCopy.textContent =
        form === "pos"
          ? "No 0-groups are needed for this map."
          : "No 1-groups are needed for this map.";
      section.append(emptyCopy);
      groupList.append(section);
      return;
    }

    const sectionList = document.createElement("div");
    sectionList.className = "group-list";

    solution.groups.forEach((group, index) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "group-item";
      item.style.setProperty("--group-accent", group.color);

      if (
        state.selectedGroup !== null &&
        state.selectedGroup.form === form &&
        state.selectedGroup.index === index
      ) {
        item.classList.add("is-selected");
      }

      const dontCareNote = group.dontCareMatches.length
        ? `<p class="group-cover">Uses d(${group.dontCareMatches.join(", ")})</p>`
        : "";

      item.innerHTML = `
        <div class="group-meta">
          <span>${groupKind(group, state.layout.totalCells)}</span>
          <span>${group.literalCount} literal${group.literalCount === 1 ? "" : "s"}</span>
        </div>
        <p class="group-term">${group.term}</p>
        <p class="group-cover">Covers ${notation}(${group.targetMinterms.join(", ")})</p>
        ${dontCareNote}
        <p class="group-note">${groupExplanation(group, form)}</p>
      `;

      item.addEventListener("click", () => {
        if (
          state.selectedGroup !== null &&
          state.selectedGroup.form === form &&
          state.selectedGroup.index === index
        ) {
          state.selectedGroup = null;
        } else {
          state.selectedGroup = { form, index };
        }
        render();
      });

      sectionList.append(item);
    });

    section.append(sectionList);
    groupList.append(section);
  });
}

function applyPreset(key, options = {}) {
  const preset = getPresetsForCount(state.variableCount).find((entry) => entry.key === key);
  if (!preset) {
    return;
  }

  state.cells = Array(state.layout.totalCells).fill("0");

  preset.ones.forEach((minterm) => {
    if (minterm < state.cells.length) {
      state.cells[minterm] = "1";
    }
  });

  preset.dontCares.forEach((minterm) => {
    if (minterm < state.cells.length) {
      state.cells[minterm] = "X";
    }
  });

  state.selectedGroup = null;
  state.lastMessage = preset.message;
  render();

  if (options.scroll !== false) {
    document.getElementById("studio").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function shuffle(values) {
  const nextValues = [...values];

  for (let index = nextValues.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextValues[index], nextValues[swapIndex]] = [nextValues[swapIndex], nextValues[index]];
  }

  return nextValues;
}

function applyRandomPattern() {
  const totalCells = state.layout.totalCells;
  const indices = shuffle(Array.from({ length: totalCells }, (_, index) => index));
  const targetOneRatio = state.variableCount >= 5 ? 0.22 : state.variableCount === 4 ? 0.3 : 0.38;
  const targetDontCareRatio = state.variableCount >= 5 ? 0.08 : 0.12;
  const oneCount = Math.max(
    1,
    Math.min(
      totalCells - 1,
      Math.round(totalCells * targetOneRatio + (Math.random() - 0.5) * totalCells * 0.08),
    ),
  );
  const dontCareCount = Math.max(
    0,
    Math.min(
      totalCells - oneCount,
      Math.round(totalCells * targetDontCareRatio * Math.random()),
    ),
  );

  state.cells = Array(totalCells).fill("0");

  indices.slice(0, oneCount).forEach((minterm) => {
    state.cells[minterm] = "1";
  });

  indices.slice(oneCount, oneCount + dontCareCount).forEach((minterm) => {
    state.cells[minterm] = "X";
  });

  state.selectedGroup = null;
  state.lastMessage =
    "Try to spot the biggest legal groups first, then compare your answer with the generated cover.";
  render();
}

function changeVariableCount(variableCount) {
  if (!presetCatalog[variableCount] || variableCount === state.variableCount) {
    return;
  }

  state.variableCount = variableCount;
  state.layout = buildLayout(variableCount);
  state.cells = Array(state.layout.totalCells).fill("0");
  state.selectedGroup = null;
  state.lastMessage = layoutMessage(state.layout);

  renderVariableControls();
  renderPresetControls();
  updateLayoutCopy();
  updateLayoutClasses();
  buildStage();
  applyPreset(getPresetsForCount(variableCount)[0].key, { scroll: false });
}

function attachEvents() {
  document.addEventListener("click", (event) => {
    const cellButton = event.target.closest(".kmap-cell");
    if (cellButton) {
      const minterm = Number.parseInt(cellButton.dataset.minterm, 10);
      state.cells[minterm] = cycleCell(state.cells[minterm]);
      state.selectedGroup = null;
      state.lastMessage =
        "Compare your own grouping idea with the minimized result shown on the right.";
      render();
      return;
    }

    const variableButton = event.target.closest("[data-variable-count]");
    if (variableButton) {
      changeVariableCount(Number.parseInt(variableButton.dataset.variableCount, 10));
      return;
    }

    const presetButton = event.target.closest("[data-preset]");
    if (presetButton) {
      applyPreset(presetButton.dataset.preset);
      return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) {
      return;
    }

    if (actionButton.dataset.action === "clear") {
      state.cells = Array(state.layout.totalCells).fill("0");
      state.selectedGroup = null;
      state.lastMessage = "The map is cleared. Load a preset or mark your own minterms.";
      render();
      return;
    }

    if (actionButton.dataset.action === "random") {
      applyRandomPattern();
    }
  });
}

function init() {
  renderVariableControls();
  renderPresetControls();
  updateLayoutCopy();
  updateLayoutClasses();
  buildStage();
  attachEvents();
  applyPreset("starter", { scroll: false });
}

if (typeof document !== "undefined") {
  init();
}

if (typeof module !== "undefined") {
  module.exports = {
    buildLayout,
    getPresetsForCount,
    solveForm,
    simplify,
  };
}
