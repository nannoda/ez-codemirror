import {SimpleCodeMirror} from "./src/ez-codemirror";

console.log("Test")

const editorDiv = document.getElementById('editor') as HTMLElement;
const editor = new SimpleCodeMirror(editorDiv,
    {
        theme: "oneDark",
        defaultText: "LOL"
    }
);

(window as any).test = () => {
    console.log(editor.content);
    console.log(editor.lines);
}