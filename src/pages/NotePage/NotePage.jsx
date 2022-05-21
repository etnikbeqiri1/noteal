import styles from "./NotePage.module.scss";
import {useParams} from "react-router-dom";
import {createReactEditorJS} from 'react-editor-js';
import {useCallback, useEffect, useRef, useState} from "react";
import DragDrop from 'editorjs-drag-drop';

import {CgNotes} from "react-icons/cg";
import {MdContentCopy} from "react-icons/md";
import {FaHeart} from "react-icons/fa"
import {FiShare} from "react-icons/fi"

import {db} from "../../common/firebase";
import {doc, getDoc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import {useBoolean, useDebounce} from "usehooks-ts";


const CodeBox = require('@bomdi/codebox');

const ReactEditorJS = createReactEditorJS();

const random = (length = 8) => {
    return Math.random().toString(16).substr(2, length);
};

const uuid = random(16);

export default function NotePage() {

    const {id} = useParams()
    const [data, setData] = useState({});
    const {value: loading, setTrue, setFalse} = useBoolean(true);
    const saveData = useDebounce(data, 1000)
    const document = doc(db, "documents", id);
    const [isReady, setIsReady] = useState(false);
    const editorCore = useRef(null)
    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance
    }, [])

    const handleReady = () => {
        setIsReady(true);
        const editor = editorCore.current._editorJS;
        new DragDrop(editor);
    };

    const updateEditorContent = (newData) => {
        if (editorCore.current) {
            editorCore.current._editorJS.render(newData).then(r => {
            });
        }
    }

    //initial state
    useEffect(() => {
        if (!isReady) return;
        getDoc(document).then(data => {
            if (data.data()) {
                updateEditorContent(data.data().content)
            }
        }).finally(() => {
            setFalse();
        }).catch((e) => {
            console.log(e)
        })
    }, [isReady])

    // when remote data changes
    useEffect(() => {
        if (!isReady) return;
        return onSnapshot(document, async (doc) => {
            if (doc.data()) {
                if (doc.data().uuid !== uuid) {
                    updateEditorContent(doc.data().content);
                }
            }
        });
    }, [isReady])


    const handleChange = useCallback(() => {
        editorCore.current.save().then(data => {
            setData(data);
        })
    }, [data])

    //debounced update
    useEffect(() => {
        if (!isReady) return;
        if (!loading && saveData && Array.isArray(saveData.blocks) && saveData.blocks.length > 0) {
            updateDoc(document, {
                content: saveData,
                uuid: uuid
            }).then(r => {
            }).catch((e) => {
                if (e.code === "not-found") {
                    setDoc(document, {
                        content: saveData,
                        uuid: uuid
                    }).then(() => {

                    })
                }
            })
        }
    }, [isReady, saveData, loading])

    return <div className={styles.container}>
        <div className={styles.header}>
            <div className={styles.branding}>
                <h2><CgNotes color={"#868da1"}/> <b>Note</b>.al</h2>
            </div>

            <div className={styles.iconButtons}>

                <button onClick={console.log}>
                    <label className={styles.label} htmlFor={"copy"}>
                        <MdContentCopy size={20} color={"#868da1"}/>
                    </label>
                </button>


                <button>
                    <label className={styles.label} htmlFor={"share"}>
                        <FiShare size={20} color={"#868da1"}/>
                    </label>
                </button>

            </div>
        </div>
        <div className={styles.paper}>
            <ReactEditorJS
                onInitialize={handleInitialize}
                onReady={handleReady}
                tools={{
                    codeBox: {
                        class: CodeBox,
                        config: {
                            themeName: 'atom-one-light',
                            useDefaultTheme: 'light'
                        }
                    },
                }}
                onChange={handleChange}
            />
        </div>
        <div className={styles.footer}>
            Made with <FaHeart color={"#D33257"}/> by PlutoLabs
        </div>
    </div>
}