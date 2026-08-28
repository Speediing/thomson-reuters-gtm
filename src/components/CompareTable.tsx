const TOOLS = [
  "Grok Bot",
  "Computer agent",
  "Chat assistant",
  "Research assistant",
] as const;

const ROWS: { label: string; values: string[] }[] = [
  {
    label: "What starts the work",
    values: [
      "An approved signal, event, or schedule",
      "A person assigns a task",
      "A person opens a chat",
      "A person asks a question",
    ],
  },
  {
    label: "Where the work happens",
    values: [
      "Across approved tools on the agent's computer",
      "Inside the assigned computer task",
      "Inside one conversation",
      "Across research sources",
    ],
  },
  {
    label: "What comes back",
    values: [
      "A finished brief, pack, or sourced reply",
      "A completed task or artifact",
      "An answer or draft",
      "A sourced research answer",
    ],
  },
];

export function CompareTable() {
  return (
    <section id="compare" className="compare">
      <p className="eyebrow">Working model</p>
      <h2>This is a working team, not another chat tab.</h2>
      <p className="section-lede">
        Each agent has its own computer, starts from an approved signal, and
        returns finished work for review.
      </p>
      <div className="compare-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Capability</span>
              </th>
              {TOOLS.map((tool) => (
                <th key={tool} scope="col">
                  {tool}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={TOOLS[index]}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
