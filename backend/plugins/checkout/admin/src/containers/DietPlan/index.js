import React, { useState, useEffect } from 'react';
 import styled from 'styled-components';
import { Select } from '@buffetjs/core';
 import {  request} from "strapi-helper-plugin";

const Title = styled.h5`
  margin-bottom: 1rem;
  color: #333740;
`;

/*
const ColorWindow = styled.div`
  background-color: ${(props) => props.color};
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: ${(props) => props.color === '#FFFFFF' && '1px solid #5B5F65'};
`;

const PopOver = styled.div`
  position: absolute;
  z-index: 2;
  top: 70px;
`;
const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;
*/


const DietPlan = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [val, setValue] = useState("");
  const [options, setOptions] = useState([]);
const title = props.validations.fieldTitle ? props.validations.fieldTitle : "Field Title"

  useEffect(() => {
    loadDietPlan();
   }, []);


  useEffect(() => {
    if(props.value)
    {
      setValue(props.value)
    }
  }, [props.value]);




  const loadDietPlan = () => {
    setIsLoading(true);


    request('/content-manager/collection-types/application::diets.diets?page=1&pageSize=10000&_sort=name:ASC', {
      method: 'GET'
    })
      .then(data => {
         let op=[""]
        if (data.results.length){
          data.results.forEach((d,i)=>{
            op.push(d.code)
          })
        }

        setOptions(op)
       })
      .catch((err) => {
        console.log(err)
        }).finally(() => setIsLoading(false));
  };

  const updateValue = (value) => {
    const name = (props.validations && props.validations.tableField ) ? props.validations.tableField : "dietplan"
    props.onChange({ target: { name: name, value: value } });
  };


  return (
    <div>
      <Title>{title}</Title>
       <Select
        name="select"
        onChange={({ target: { value } }) => {
           setValue(value);
          updateValue(value);

        }}
        options={options}
        value={val}
      />

    </div>
  );
};

export default DietPlan;