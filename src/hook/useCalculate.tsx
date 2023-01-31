import React, { useRef, useState } from "react";
import { numbers } from "../config/config";
import { State, Errors } from "../interface/interface";

const useCalculate = () => {
  const [state, setState] = useState<State>({
    bill: "",
    percentage: "",
    people: "",
    total: 0,
  });

  const formulario = useRef<HTMLFormElement>(null);

  const [custom, setCustom] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const { bill, percentage, people, total } = state;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (Number(value) > 0) {
      setState({ ...state, [name]: Number(value) });
    }
  };

  const getPercentage = (item: number) =>
    setState({ ...state, percentage: item });

  const handleCustom = () => setCustom(true);

  const calculate = (): void => {
    const copyState: State = { ...state };

    delete copyState["total"];

    if (
      Object.values(copyState)
        .slice(0, 2)
        .every((item) => typeof item === "number")
    ) {
      const bill = Number(state.bill);
      const percentage = Number(state.percentage);

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
    const copy: Errors = { ...state };
    Object.keys(copy).forEach((key) => {
      copy[key] = 0;
    });

    setState({
      bill: "",
      percentage: "",
      people: "",
      total: 0,
    });
    setCustom(false);

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
