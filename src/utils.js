function convertToCytoscapeElements(node, parentId = null, idCounter = { count: 0 }) {
  if (!node) {
    console.error('convertToCytoscapeElements: node is undefined');
    return [];
  }
  const nodeId = `node${idCounter.count++}`;
  const label = `Execution Order: ${node.executionOrder || "N/A"}\n${node.name}${node.condition ? `\nCondition: ${node.condition}` : ""}`;
  const elements = [
    {
      data: {
        id: nodeId,
        label: label,
        executionOrder: node.executionOrder || "",
      },
    },
  ];

  if (parentId) {
    elements.push({
      data: {
        id: `edge${idCounter.count++}`,
        source: parentId,
        target: nodeId,
      },
    });
  }

  if (node.children) {
    node.children.forEach((child) => {
      elements.push(...convertToCytoscapeElements(child, nodeId, idCounter));
    });
  }

  return elements;
}

module.exports = {
  convertToCytoscapeElements
}