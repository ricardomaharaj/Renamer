import { useEffect, useState } from 'react'

type State = {
    input?: string
    output?: string
    insert?: string
    insertPosition?: number
    insertStart?: number
    insertEnd?: number
    overwrite?: string
    overwritePosition?: number
    overwriteStart?: number
    overwriteEnd?: number
    replace?: string
    replaceWith?: string
    replaceStart?: number
    replaceEnd?: number
}

export function App() {

    let [state, setState] = useState({
        input: '',
        output: '',
        insert: '',
        insertPosition: 0,
        insertStart: 0,
        insertEnd: 0,
        overwrite: '',
        overwritePosition: 0,
        overwriteStart: 0,
        overwriteEnd: 0,
        replace: '',
        replaceWith: '',
        replaceStart: 0,
        replaceEnd: 0,
    })

    let updateState = (update: State) => setState({ ...state, ...update })

    useEffect(() => {
        let arr = state.input.split('\n')
        let newArr = arr.map((x, i) => {
            if (state.replace) {
                if (i >= state.replaceStart && i <= state.replaceEnd) {
                    x = x.replace(state.replace, state.replaceWith)
                }
            }
            if (state.insert) {
                if (i >= state.insertStart && i <= state.insertEnd) {
                    let one = x.slice(0, state.insertPosition)
                    let two = x.slice(state.insertPosition, x.length)
                    x = one + state.insert + two
                }
            }
            if (state.overwrite) {
                if (i >= state.overwriteStart && i <= state.overwriteEnd) {
                    let one = x.slice(0, state.overwritePosition)
                    let two = x.slice(state.overwritePosition, x.length)
                    x = one + state.overwrite + two.substring(state.overwrite.length - 1, two.length)
                }
            }
            return x
        })
        updateState({ output: newArr.join('\n') })
    }, [state])

    return <div className='col'>
        <div className='row'>
            <div className='col'>
                <label>Input</label>
                <textarea cols={60} rows={20} onChange={e => updateState({ input: e.target.value })} />
            </div>
            <div className='col'>
                <label>Output</label>
                <textarea disabled={true} value={state.output} cols={60} rows={20} />
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <label> Insert </label>
                <input type='text' onChange={e => updateState({ insert: e.target.value })} />
                <label> At Position </label>
                <input type='number' onChange={e => updateState({ insertPosition: parseInt(e.target.value) })} />
                <label> From Line </label>
                <input type='number' onChange={e => updateState({ insertStart: parseInt(e.target.value) })} />
                <label> To Line </label>
                <input type='number' onChange={e => updateState({ insertEnd: parseInt(e.target.value) })} />
            </div>
            <div className='col'>
                <label> Overwrite With </label>
                <input type='text' onChange={e => updateState({ overwrite: e.target.value })} />
                <label> At Position </label>
                <input type='number' onChange={e => updateState({ overwritePosition: parseInt(e.target.value) })} />
                <label> From Line </label>
                <input type='number' onChange={e => updateState({ overwriteStart: parseInt(e.target.value) })} />
                <label> To Line </label>
                <input type='number' onChange={e => updateState({ overwriteEnd: parseInt(e.target.value) })} />
            </div>
            <div className='col'>
                <label> Replace </label>
                <input type='text' onChange={e => updateState({ replace: e.target.value })} />
                <label> With </label>
                <input type='text' onChange={e => updateState({ replaceWith: e.target.value })} />
                <label> From Line </label>
                <input type='number' onChange={e => updateState({ replaceStart: parseInt(e.target.value) })} />
                <label> To Line </label>
                <input type='number' onChange={e => updateState({ replaceEnd: parseInt(e.target.value) })} />
            </div>
        </div>
    </div>
}