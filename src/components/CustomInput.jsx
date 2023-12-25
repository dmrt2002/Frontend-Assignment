/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip, Input } from 'antd';
import {
    InfoCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

/* eslint-disable react/prop-types */
const CustomInput = ({ json, onChange, hideAdv }) => {
    const [text, setText] = useState('')
    const [customJson, setCustomJson] = useState(json)
    const [isValid, setIsValid] = useState(true)
    useEffect(() => {
        setCustomJson(json)
    }, [json])
    const [hideAdvanced, setHideAdvanced] = useState()

    useEffect(() => {
        if(!customJson.validate.required && !hideAdvanced) {
            setHideAdvanced(hideAdv)
        }
        else {
            setHideAdvanced(false)
        }
    }, [hideAdv])

    const handleChange = (event) => {
        setText(event.target.value)
        if (customJson.validate.required) {
            if (event.target.value === '') {
                setIsValid(false)
            }
            else {
                setIsValid(true)
            }
        }
        onChange(event.target.value, customJson.jsonKey)
    }


    return (
        <>
            {!hideAdvanced &&  (
                <div className="md:col-span-5 flex justify-between items-center w-full mt-2">
                    <span className='w-[50%]'>
                        <label className='w-[50%] pr-4'>{customJson.label}{customJson.validate.required === true ? '*' : ''}</label>
                        {customJson.description !== '' && (
                            <Tooltip title={customJson.description}>
                                <spam className="cursor-pointer">
                                    <InfoCircleOutlined />
                                </spam>
                            </Tooltip>
                        )}
                    </span>
                    <Input placeholder={customJson.placeholder} onChange={(e) => handleChange(e)} value={text} disabled={json.validate.immutable} type="text" name={json.jsonKey} className={`mt-1 rounded w-[60%] ${!isValid ? 'border-red-500 border' : ''}`} />
                </div>
            )}

        </>
    )
}

export default CustomInput;