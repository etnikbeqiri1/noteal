import styles from "./NotePage.module.scss";
import {useParams} from "react-router-dom";
import {createReactEditorJS} from 'react-editor-js';
import {useCallback, useEffect, useRef, useState} from "react";
import DragDrop from 'editorjs-drag-drop';
import Undo from 'editorjs-undo';
import {CgNotes} from "react-icons/cg";
import {MdContentCopy} from "react-icons/md";
import {FaHeart} from "react-icons/fa"
import {FiShare} from "react-icons/fi"

import {db} from "../../common/firebase";
import {doc, getDoc, onSnapshot, updateDoc, setDoc} from "firebase/firestore";
import {useBoolean, useDebounce} from "usehooks-ts";





const CodeBox = require('@bomdi/codebox');

const ReactEditorJS = createReactEditorJS();
export default function NotePage() {


    const {id} = useParams()
    const [data, setData] = useState({});
    const {value: loading, setTrue, setFalse} = useBoolean(true);
    const saveData = useDebounce(data, 1000)
    const document = doc(db, "documents", id);

    useEffect(() => {
        getDoc(document).then(data => {
            if (data.data()) {
                setData(data.data().content)
            }
        }).finally(() => {
            setFalse();
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    useEffect(() => {
        return onSnapshot(document, (doc) => {
            if (doc.data()) {
                setData(doc.data().content)
                console.log(doc.data().content)
            }
        });
    }, [])

    useEffect(() => {
        if (loading) {
            saveData(data);
        }

        if (!loading && Object.keys(data).length >= 1) {
            console.log('intside with length - ' +  Object.keys(data).length)


            updateDoc(document, {
                content: saveData
            }).then(r => {
            }).catch((e) => {
                if (e.code === "not-found") {
                    setDoc(document, {
                        content: saveData
                    }).then(() => {

                    })
                }
            })
        }
    }, [saveData, loading])

    const handleChange = () => {
        editorCore.current.save().then(data => {
            console.log(data)
            setData(data)
        })
    }

    // continues the code for editor here below

    const editorCore = useRef(null)


    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance
    }, [])


    const handleReady = () => {
        const editor = editorCore.current._editorJS;
        new Undo({editor})
        new DragDrop(editor);
    };

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
                // defaultValue={{
                //     time: 1635603431943,
                //     blocks: [
                //         {
                //             id: "IpKh1dMyC6",
                //             type: "paragraph",
                //             data: {
                //                 text:
                //                     "We have been working 😏"
                //             }
                //         }
                //     ]
                // }}
                defaultValue={data}
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