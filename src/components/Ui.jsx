/* eslint-disable react/jsx-key */

import { useEffect, useState } from "react";
import Schema from "../helpers/Schema.jsx"
import { Switch } from "antd";
import { dataState } from "../atom/data";
import { useRecoilState, useRecoilValue } from "recoil";
import Loader from "./Loader";
import { dependencyState } from "../atom/dependency";

// eslint-disable-next-line react/prop-types
function Ui({ UpdatedJson }) {

  const [invalidJson, setInvalidJson] = useState(false)
  const [json, setJson] = useState([])
  const [hideAdvanced, setHideAdvanced] = useState(true)
  const [data, setData] = useRecoilState(dataState)
  const dependency = useRecoilValue(dependencyState)
  const [buttonLoader, setButtonLoader] = useState(false)
  const [result, setResult] = useState(false)

  useEffect(() => {
    let parsedJson;
    try {
      parsedJson = JSON.parse(UpdatedJson);
      parsedJson.sort((a, b) => a.sort - b.sort)
    } catch (err) {
      setInvalidJson(true)
      parsedJson = ''
    }
    setJson(parsedJson)
  }, [UpdatedJson])

  const handleChange = (checked) => {
    setHideAdvanced(checked)
  }

  const handleSubmit = () => {
    setButtonLoader(true)
    setData(prevData => {
      let data = [...prevData];
      dependency.forEach((dep) => {
        let index = data.findIndex((obj) => obj.key === dep)
        if(index !== -1) {
          data.splice(index, 1)
        }
      })
      return data
    })
    setTimeout(() => {
      setButtonLoader(false)
      setResult(true)
    }, 500)
  }

  if(invalidJson && json.length === 0 ) {
    return (
      <div className="flex justify-center items-center h-full w-[50%]">
        <Loader />
        </div>
    )
  } 

  if(result) {
    return (
      <div className="flex flex-col items-center justify-center w-[50%] h-full">
      <div className="text-center font-bold mb-4">Api Body</div>
      <div className="bg-white rounded shadow-xl px-12 pb-[30px] pt-[20px] mb-2 flex items-start flex-col justify-center">
        {data.map((obj) => {
          return (
            <div className="flex items-center justify-center m-2">
              <div><span className="font-bold mr-3 mb-2 w-[40%]">{obj.key} :</span>{obj.value === true ? 'true' : obj.value === false ? 'false' : obj.value}</div>
            </div>
          )
        })}
      </div>
      </div>
    )
  }

  return (
    <>
      <div className="w-[50vw]">
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div className="bg-white rounded shadow-lg px-4 mb-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        {json.map((obj) => {
                          return (
                            <>
                              <Schema object={obj} hideAdvanced={hideAdvanced} />
                            </>
                          )
                        })}
                  </div>
                </div>
                  <div className="flex items-center justify-between gap-3 py-3 border-t mt-4 mb-2">
                  <div className="flex items-center gap-2 justify-start">
                    <div className='text-sm'>Hide Advanced fields</div>
                    <Switch size='small' style={{backgroundColor: hideAdvanced ? '' : 'black'}}  defaultChecked={hideAdvanced} onChange={handleChange} />
                  </div>
                  <div>
                  <button
                    className="bg-white px-6 py-[0.3rem]  rounded-lg border-[1px]"
                  >
                    Back
                  </button>
                  <button
                    className="bg-black px-6 py-[0.3rem] text-white rounded-lg border-[1px]"
                    onClick={() => handleSubmit()}
                  >
                    {buttonLoader ? (
                      <Loader />
                    ) : (
                      'Submit'
                    )}
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ui
