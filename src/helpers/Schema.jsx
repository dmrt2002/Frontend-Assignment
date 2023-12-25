/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import RadioInput from "../components/RadioInput";
import Group from "../components/Group";
import SelectInput from "../components/SelectInput";
import Ignore from "../components/Ignore";
import { dataState } from "../atom/data";
import { useRecoilState } from "recoil";
import SwitchInput from "../components/SwitchInput";

function Schema({ object, hideAdvanced }) {
    const [inputObject, setInputObject] = useState({
        uiType: ''
    })
    const [data, setData] = useRecoilState(dataState)
    const [hideAdv, setHideAdv] = useState()

    useEffect(() => {
        if (object) {
            setInputObject(object)
        }
    }, [object])

    useEffect(() => {
        setHideAdv(hideAdvanced)
    }, [hideAdvanced])

    const onChange = (value, key) => {
        if (value !== '' && key !== '') {
            setData(prevData => {
                let newData = [...prevData];
    
                const existingIndex = newData.findIndex(item => item.key === key);
    
                if (existingIndex !== -1) {
                    newData.splice(existingIndex, 1);
                }
    
                newData.push({ key: key, value: value });

                return newData;
            });
        }
    }

    switch (inputObject.uiType) {
        case 'Input':
            return <CustomInput json={inputObject} onChange={onChange} hideAdv={hideAdv} />;
        case 'Group':
            return <Group json={inputObject} hideAdv={hideAdv}  />;
        case 'Radio':
            return <RadioInput json={inputObject} onChange={onChange} hideAdv={hideAdv}  />;
        case 'Select':
            return <SelectInput json={inputObject} onChange={onChange} hideAdv={hideAdv}  />;
        case 'Switch':
            return <SwitchInput json={inputObject} onChange={onChange} hideAdv={hideAdv}  />;
        case 'Ignore':
            return <Ignore json={inputObject} hideAdv={hideAdv}  />;
        default:
            return null;
    }
}

export default Schema