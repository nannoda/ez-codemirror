import {EditorView, keymap} from "@codemirror/view";
import {EditorState} from "@codemirror/state";
import {basicSetup} from "codemirror";
import {javascript} from "@codemirror/lang-javascript";
import {acceptCompletion, autocompletion, currentCompletions} from "@codemirror/autocomplete";
import {oneDark} from "@codemirror/theme-one-dark";

type OptionsType = {
    theme?: "default" | "oneDark",
    defaultText?: string,
}

const typeKeymap = keymap.of([
    {
        key: 'Tab',
        run: (view) => {
            const completions = currentCompletions(view.state);
            if (!completions) {
                return false;
            }
            if (completions.length === 0) {
                console.log('Completion not active')
                const tabSpace = "  "
                // append 2 spaces and move cursor
                view.dispatch({
                    changes: {
                        from: view.state.selection.main.head,
                        insert: tabSpace
                    },
                });
                // move cursor
                view.dispatch({
                    selection: {
                        anchor: view.state.selection.main.head + tabSpace.length,
                    }
                });
            } else {
                console.log('Completion available')
                acceptCompletion(view);
            }

            console.log('Tab pressed');
            return true;
        }
    }
])


/**
 * A simple wrapper for CodeMirror
 */
export class SimpleCodeMirror {
    view: EditorView;

    constructor(parent: HTMLElement, options: OptionsType) {
        let theme = oneDark;

        if (options.theme === "default"){
            // use dark theme
            theme = EditorView.theme({});
        }

        const state = EditorState.create({
            doc: options.defaultText || "",
            extensions: [
                basicSetup,
                EditorView.editorAttributes.of({class: 'editor'}),
                javascript(),
                autocompletion(),
                typeKeymap,
                theme
            ],
        });

        this.view = new EditorView({
            state: state,
            parent: parent,
        });
    }

    get content(){
        let out="";
        for (let line of this.lines){
            out += line + "\n";
        }
        return out;
    }

    set content(text: string){
        this.view.dispatch({
            changes: {
                from: 0,
                to: this.view.state.doc.length,
                insert: text
            }
        })
    }

    get lines(){
        return this.view.state.doc.toJSON();
    }
}

export class EzCodemirror{

}