/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

/* eslint-disable react/prop-types */
const RadioInput = ({ json, onChange, hideAdv }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [customJson, setCustomJson] = useState(json);
    const [isValid, setIsValid] = useState(false)
    const [hideAdvanced, setHideAdvanced] = useState(false)

    useEffect(() => {
        setCustomJson(json)
    }, [json])


    useEffect(() => {
        if (!customJson.validate.required) {
            setHideAdvanced(hideAdv)
        }
        else {
            setHideAdvanced(false)
        }
    }, [hideAdv])

    useEffect(() => {
        if (customJson.validate.required) {

            if (selectedOption === '') {
                setIsValid(false)
            }
            else {
                setIsValid(true)
            }
        }
        onChange(selectedOption, customJson.jsonKey)
    }, [selectedOption])

    useEffect(() => {
        setTimeout(() => {
            if (customJson.validate.defaultValue && !hideAdvanced) {
                setSelectedOption(customJson.validate.defaultValue)
                onChange(customJson.validate.defaultValue, customJson.jsonKey)
            }
        }, 200)
    }, [])

    return (
        <>
            {!hideAdvanced && (
                <div className='md:col-span-5 mt-2'>
                    <>
                        <div className={`pt-2 ${!isValid ? 'text-red-600' : ''}`}>{customJson.label}{customJson.validate.required === true ? '*' : ''}</div>
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            {customJson.validate.options.map((option) => {
                                return (
                                    <div key={option.label} className='inline-block cursor-pointer'>
                                        <div onClick={() => setSelectedOption(option.value)} className={`h-10 border w-full] flex items-center cursor-pointer ${selectedOption === option.value ? 'bg-sky-200 bg-opacity-50' : ''}`}>
                                            <label className="px-3 cursor-pointer">{option.label}</label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                </div>
            )}

        </>

    )
}

export default RadioInput;