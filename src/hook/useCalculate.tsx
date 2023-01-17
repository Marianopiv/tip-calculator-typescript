import React, { useRef, useState } from "react";
import { State, Errors } from "../interface/interface";

const useCalculate = () => {
  const [state, setState] = useState({
    bill: 0,
    percentage: 0,
    people: 0,
    total: 0,
  });

  const formulario = useRef(null);

  const [custom, setCustom] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const { bill, percentage, people, total } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (Number(value) > 0) {
      setState({ ...state, [name]: value });
    }
  };

  const getPercentage = (item: number) =>
    setState({ ...state, percentage: item });

  const handleCustom = () => setCustom(true);

  const calculate = (): void => {
    const copyState: State = { ...state };

    delete copyState["total"];

    if (Object.values(copyState).every((item) => item !== 0)) {
      setState((prevState) => ({
        ...prevState,
        total: (bill * percentage) / 100,
      }));
    }
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>, text: string) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors({ ...errors, [name]: text });
    } else {
      setErrors((current) => {
        // 👇️ create copy of state object
        const copy: Errors = { ...current };

        // 👇️ remove salary key from object
        delete copy[name];

        return copy;
      });
    }
  };

  const reset = () => {
    const copy:Errors = { ...state };
    Object.keys(copy).forEach((key) => {
      copy[key] = 0;
    });

    setState({
    bill: 0,
    percentage: 0,
    people: 0,
    total: 0,
  });

    formulario?.current?.reset();
  };

  
  return {
    handleChange,
    bill,
    percentage,
    people,
    total,
    getPercentage,
    handleCustom,
    custom,
    handleBlur,
    errors,
    calculate,
    formulario,
    reset,
  };
};

export default useCalculate;
