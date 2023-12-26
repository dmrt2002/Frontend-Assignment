/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Tooltip } from 'antd';
import {
    InfoCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataState } from '../atom/data';
import { dependencyState } from '../atom/dependency';

import Schema from "../helpers/Schema.jsx";
const Ignore = ({ json, hideAdv }) => {
    const [customJson, setCustomJson] = useState(json)
    const [currentData, setCurrentData] = useState()
    const [hide, setHide] = useState(true)
    const data = useRecoilValue(dataState)
    const [dependency, setDependency] = useRecoilState(dependencyState)
    const [hideAdvanced, setHideAdvanced] = useState()

    useEffect(() => {
        json.subParameters.sort((a, b) => a.sort - b.sort)
        setCustomJson(json)
    }, [json])

    useEffect(() => {
        setDependency(prevData => {
            let newData = [...prevData];
            let values = customJson.subParameters.map((parameter) => parameter.jsonKey)
            values.forEach((value) => {
                const index = newData.indexOf(value);
                if (index !== -1) {
                    return;
                }
                newData.push(value);
            })
            console.log(newData, "newdata")
            return newData;
        });
    } , [])

    useEffect(() => {
        console.log("dependency", dependency)
    }, [dependency])

    useEffect(() => {
        if(!customJson.validate.required) {
            setHideAdvanced(hideAdv)
        }
        else {
            setHideAdvanced(false)
        }
    }, [hideAdv])

    function validateCondition(data, condition) {
        const { jsonKey, op, value } = condition;

        const currentValue = data.find((obj) => obj.value === value);

        if(!currentValue) {
            return false
        }

        setDependency(prevData => {
            let data = [...prevData]
            let values = customJson.subParameters.map((parameter) => parameter.jsonKey)
            values.forEach((value) => {
                const index = data.indexOf(value);
                if (index !== -1) {
                    data.splice(index, 1);
                }
            })
            return data;
        })

        switch (op) {
          case '==':
            return currentValue.value === value;
          case '!=':
            return currentValue.value !== value;
          default:
            return false;
        }
      }
      function validateAllConditions(state, conditions) {
        return conditions.every(condition => validateCondition(state, condition));
      }

    useEffect(() => {
        setCurrentData(data)
        let isHide = validateAllConditions(data, customJson.conditions)
        setHide(!isHide)
        if(!isHide) {
            setDependency(prevData => {
                let newData = [...prevData];
                let values = customJson.subParameters.map((parameter) => parameter.jsonKey)
                values.forEach((value) => {
                    const index = newData.indexOf(value);
                    if (index !== -1) {
                        return;
                    }
                    newData.push(value);
                })
                console.log(newData, "newdata")
                return newData;
            });
        }
    }, [data])

    return (
        <>
            {!hide && !hideAdvanced && (
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

export default Ignore;