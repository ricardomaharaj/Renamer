export function App() {
    const TA_ROWS = 20
    const TA_COLS = 60

    let getValue = (id: string): string => {
        return document.querySelector<HTMLInputElement>(id)!.value
    }

    let getValueAsNumber = (id: string): number => {
        return document.querySelector<HTMLInputElement>(id)!.valueAsNumber
    }

    let onChange = () => {
        let input = document.querySelector<HTMLTextAreaElement>('#input')!.value

        let insertText = getValue('#insertText')
        let insertPosition = getValueAsNumber('#insertPosition')
        let insertStart = getValueAsNumber('#insertStart')
        let insertEnd = getValueAsNumber('#insertEnd')

        let overwriteText = getValue('#overwriteText')
        let overwritePosition = getValueAsNumber('#overwritePosition')
        let overwriteStart = getValueAsNumber('#overwriteStart')
        let overwriteEnd = getValueAsNumber('#overwriteEnd')

        let replaceText = getValue('#replaceText')
        let replaceWith = getValue('#replacePosition')
        let replaceStart = getValueAsNumber('#replaceStart')
        let replaceEnd = getValueAsNumber('#replaceEnd')

        let arr = input.split('\n')
        let newArr = arr.map((x, i) => {
            if (replaceText) {
                if (i >= replaceStart && i <= replaceEnd) {
                    x = x.replace(replaceText, replaceWith)
                }
            }
            if (insertText) {
                if (i >= insertStart && i <= insertEnd) {
                    let one = x.slice(0, insertPosition)
                    let two = x.slice(insertPosition, x.length)
                    x = one + insertText + two
                }
            }
            if (overwriteText) {
                if (i >= overwriteStart && i <= overwriteEnd) {
                    let one = x.slice(0, overwritePosition)
                    let two = x.slice(overwritePosition, x.length)
                    x =
                        one +
                        overwriteText +
                        two.substring(overwriteText.length - 1, two.length)
                }
            }
            return x
        })

        document.querySelector<HTMLTextAreaElement>('#output')!.value =
            newArr.join('\n')
    }

    return (
        <div className='col m-2 space-y-2'>
            <div className='row justify-center space-x-2 p-2'>
                <div className='text-xl'>Renamer</div>
            </div>
            <div className='row space-x-2'>
                <div className='col space-y-1'>
                    <label>Input</label>
                    <textarea id='input' rows={TA_ROWS} cols={TA_COLS} />
                </div>
                <div className='col space-y-1'>
                    <label>Output</label>
                    <textarea
                        id='output'
                        rows={TA_ROWS}
                        cols={TA_COLS}
                        disabled={true}
                    />
                </div>
            </div>
            <div className='row space-x-2'>
                <div className='col space-y-1'>
                    <label>Insert</label>
                    <input type='text' id='insertText' onChange={onChange} />
                    <label>At Position</label>
                    <input
                        type='number'
                        id='insertPosition'
                        defaultValue={0}
                        onChange={onChange}
                    />
                    <label>From Line</label>
                    <input
                        type='number'
                        id='insertStart'
                        defaultValue={0}
                        onChange={onChange}
                    />
                    <label>To Line</label>
                    <input
                        type='number'
                        id='insertEnd'
                        defaultValue={0}
                        onChange={onChange}
                    />
                </div>
                <div className='col space-y-1'>
                    <label>Overwrite With</label>
                    <input type='text' id='overwriteText' onChange={onChange} />
                    <label>At Position</label>
                    <input
                        type='number'
                        id='overwritePosition'
                        defaultValue={0}
                        onChange={onChange}
                    />
                    <label>From Line</label>
                    <input
                        type='number'
                        id='overwriteStart'
                        defaultValue={0}
                        onChange={onChange}
                    />
                    <label>To Line</label>
                    <input
                        type='number'
                        id='overwriteEnd'
                        defaultValue={0}
                        onChange={onChange}
                    />
                </div>
                <div className='col space-y-1'>
                    <label>Replace</label>
                    <input type='text' id='replaceText' onChange={onChange} />
                    <label>With</label>
                    <input
                        type='text'
                        id='replacePosition'
                        onChange={onChange}
                    />
                    <label>From Line</label>
                    <input
                        type='number'
                        id='replaceStart'
                        defaultValue={0}
                        onChange={onChange}
                    />
                    <label>To Line</label>
                    <input
                        type='number'
                        id='replaceEnd'
                        defaultValue={0}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    )
}
