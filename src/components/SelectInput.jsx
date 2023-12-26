/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Tooltip, Select } from 'antd';
import {
    InfoCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

import Schema from "../helpers/Schema.jsx";
const SelectInput = ({ json, onChange, hideAdv }) => {
    const [customJson, setCustomJson] = useState(json)
    const [hideAdvanced, setHideAdvanced] = useState(false)
    const handleChange = (value) => {
        if(!hideAdvanced) {
            onChange(value, customJson.jsonKey)
        }
    };
    useEffect(() => {
        if (!customJson.validate.required) {
            setHideAdvanced(hideAdv)
        }
        else {
            setHideAdvanced(false)
        }
    }, [hideAdv])

    useEffect(() => {
        setCustomJson(json)
    }, [json])

    useEffect(() => {
        setTimeout(() => {
            if (customJson.validate.defaultValue && customJson.validate.required) {
                onChange(customJson.validate.defaultValue, customJson.jsonKey)
            }
        }, 100)
    }, [])
    return (
        <>
            {!hideAdvanced && (
                <div className="md:col-span-5 flex justify-between items-center w-full mt-2">
                    <span>
                        <label className='w-[50%] pr-4' htmlFor="full_name">{customJson.label}{customJson.validate.required === true ? '*' : ''}</label>
                        {customJson.description !== '' && (
                            <Tooltip title={customJson.description}>
                                <spam className="cursor-pointer">
                                    <InfoCircleOutlined />
                                </spam>
                            </Tooltip>
                        )}
                    </span>
                    <Select
                        defaultValue={customJson.validate.defaultValue}
                        style={{ width: "50%" }}
                        onChange={handleChange}
                        options={customJson.validate.options}
                    />
                </div>
            )}

        </>
    )
}

export default SelectInput;