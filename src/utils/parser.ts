import { option } from "../app/types/dataTypes";

export const parseConfigurationOptions = async (content: Response) => {
  const rewriter = new HTMLRewriter();

  const data: option[] = [];

  let dataField: string | null = null;
  let hasNote = true;

  await rewriter
    .on("dl.variablelist dt span a code", {
      text(text: HTMLRewriterTypes.Text) {
        if (text.text.length === 0) return;
        data.push({
          title: text.text.replace("&lt;", "<").replace("&gt;", ">"),
          desc: null,
          note: null,
          type: null,
          default: null,
          example: null,
          declared_by: null,
          declared_by_link: null,
        });
        dataField = "desc";
        hasNote = true;
      },
    })
    .on("dl.variablelist dd > p:nth-child(2) ", {
      text(text) {
        if (text.text.startsWith("Type:")) {
          hasNote = false;
          return;
        }
        if (hasNote) {
          const lastData = data[data.length - 1];
          const parsedText = text.text.replace(/\n/g, " ");
          if (lastData.note === null) {
            lastData.note = "";
          }
          lastData.note = lastData.note + parsedText;
          text.remove();
        }
      },
    })
    .on("dl.variablelist dd > p", {
      text(text: HTMLRewriterTypes.Text) {
        if (text.removed) return;
        if (text.text.length === 0) return;
        const lastData = data[data.length - 1];

        if (text.text.startsWith("Type:")) {
          dataField = "Type:";
          return;
        } else if (text.text.startsWith("Default:")) {
          dataField = "Default:";
          return;
        } else if (text.text.startsWith("Example:")) {
          dataField = "Example:";
          return;
        } else if (text.text.startsWith("Declared by:")) {
          dataField = null;
          return;
        }

        if (dataField === "Type:") {
          const parsedText = text.text.trim().replace(/\n/g, "");
          lastData.type = parsedText;
        } else if (dataField === "Default:") {
          if (text.text.length === 1) return;
          const parsedText = text.text.trim().replace(/\n/g, "").replace(/\s+/g, " ");
          lastData.default = parsedText;
        } else if (dataField === "Example:") {
          const parsedText = text.text.trim().replace(/\n/g, " ");
          lastData.example = parsedText;
        } else if (dataField === "desc") {
          const parsedText = text.text.replace(/\n/g, " ");
          if (lastData.desc === null) {
            lastData.desc = "";
          }
          lastData.desc = lastData.desc + parsedText;
        }
      },
    })
    .on("dl.variablelist dd > table a.filename", {
      element(element) {
        const lastData = data[data.length - 1];
        lastData.declared_by_link = element.getAttribute("href");
      },
      text(text: HTMLRewriterTypes.Text) {
        if (text.text.length === 0) return;
        const lastData = data[data.length - 1];
        lastData.declared_by = text.text.replace("\n&lt;", "").replace("&gt;\n", "");
      },
    })
    .on("dl.variablelist dd > pre", {
      text(text: HTMLRewriterTypes.Text) {
        if (text.text.length === 0) return;
        const lastData = data[data.length - 1];
        lastData.example = text.text;
      },
    })
    .transform(content);

  return data;
};
