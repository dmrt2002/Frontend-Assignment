/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Tooltip } from 'antd';
import {
    InfoCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

import Schema from "../helpers/schema";
const Group = ({ json, hideAdv }) => {
    const [customJson, setCustomJson] = useState(json)
    const [hideAdvanced, setHideAdvanced] = useState(false)

    useEffect(() => {
        json.subParameters.sort((a, b) => a.sort - b.sort)
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

    return (
        <>
            {!hideAdvanced && (
                <>
                    <div className='md:col-span-5 mt-4 mb-2'>
                        <div className='border-b flex gap-4 items-center w-full'>
                            <div className='pb-2'>{customJson.label}{customJson.validate.required === true ? '*' : ''}</div>
                            {customJson.description !== '' && (
                                <Tooltip title={customJson.description}>
                                    <span className='pb-2 cursor-pointer'>
                                        <InfoCircleOutlined />
                                    </span>
                                </Tooltip>
                            )}
                        </div>

                    </div>
                    {json.subParameters.map((obj) => {
                        return (
                            <Schema object={obj} hideAdvanced={hideAdv} />
                        )
                    })}
                </>
            )}
        </>
    )
}

export default Group;