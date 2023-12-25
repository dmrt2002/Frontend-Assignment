/* eslint-disable react-hooks/exhaustive-deps */
// import { Tooltip } from 'antd';
// import {
//     InfoCircleOutlined,
// } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Switch } from 'antd';

/* eslint-disable react/prop-types */
const SwitchInput = ({ json, onChange, hideAdv }) => {
    const [customJson, setCustomJson] = useState(json)
    const [switchInput, setSwitchInput] = useState(customJson.validate.defaultValue)
    const [hideAdvanced, setHideAdvanced] = useState(false)
    const onSwitchChange = (checked) => {
        setSwitchInput(checked)
        if(!hideAdvanced) {
            onChange(checked, customJson.jsonKey)
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
        setTimeout(() => {
            if (customJson.validate.defaultValue && !hideAdvanced) {
                onChange(customJson.validate.defaultValue, customJson.jsonKey)
            }
        }, 300)
    }, [])

    useEffect(() => {
        setCustomJson(json)
    }, [json])

    return (
        <>
            {!hideAdvanced && (
                <div className="mt-2 flex items-center gap-2">
                    <div className='text-sm'>{customJson.label}{customJson.validate.required === true ? '*' : ''}</div>
                    <Switch style={{ backgroundColor: switchInput ? '' : 'black' }} size='small' defaultChecked={customJson.validate.defaultValue} onChange={onSwitchChange} />
                </div>
            )}

        </>
    )
}

export default SwitchInput;