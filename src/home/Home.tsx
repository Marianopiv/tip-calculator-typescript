import React from 'react'
import NavBar from '../components/navBar/NavBar.js';
import useCalculate from '../hook/useCalculate.js';
import {numbers,grayStyle} from "../config/config.js"
import icon from "../assets/icon.png"
import Result from '../components/result/Result.js';
import "./home.css"
const Home = () => {

  const {
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
   } = useCalculate();

  const handleSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    calculate();
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen pl-4">
        <NavBar />
        <form
          onSubmit={handleSubmit}
          ref={formulario}
          className="md:rounded-md flex flex-col md:flex-row w-96 md:w-3/4 md:bg-white md:p-10 mt-4 max-w-xs sm:max-w-sm"
        >
          <div className="flex-col">
            <h3 >Bill</h3>
            <div className="flex md:flex-col md:h-24 justify-around rounded-sm  py-1">
              <div className="flex px-3 py-2 rounded-md items-center w-96 bg-pink-50 md:mr-14">
              <p className="text-gray-500 mr-1">$</p>
                <input
                  className={`text-custom-950 text-lg font-bold focus:ring bg-pink-50  focus:outline-none rounded-md focus:ring-green2-950 ${
                    errors.bill ? "border-red-500 border-2" : ""
                  }`}
                  onChange={handleChange}
                  type="number"
                  onBlur={(e) => handleBlur(e, "Bill can't be 0")}
                  name="bill"
                  value={bill}
                />
                <p className="text-center text-xs ml-3 text-red-500">
                  {errors.bill && <p className="md:p-3">{errors.bill}</p>}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:h-24 my-5 gap-4">
              <h3 className={grayStyle}>Select Tip %</h3>
              <div className="flex flex-wrap md:h-24 items-center gap-2 md:gap-8">
                {numbers.map((item:number, index:number) => (
                  <div
                    key={index}
                    className="flex flex-col md:w-1/4 justify-center pb-2"
                  >
                    <button
                      type="button"
                      disabled={bill === 0}
                      onClick={() => getPercentage(item)}
                      name={"percentage"}
                      value={percentage}
                      key={index}
                      className={` sm:w-28 md:w-22 h-10 bg-custom-950 font-bold text-md tracking-widest active:bg-green2-950 text-white ${
                        percentage === Number(item) ? "bg-green2-950" : ""
                      }${bill === 0 ? "cursor-not-allowed" : ""}`}
                    >
                      {item}%
                    </button>
                  </div>
                ))}
                <div className="flex flex-col justify-center pb-2">
                  {custom ? (
                    <input
                      onChange={handleChange}
                      className=" w-28 h-10 bg-pink-50 focus:ring  focus:outline-none rounded-md focus:ring-green2-950"
                      type="number"
                      name="percentage"
                      value={percentage}
                      max={bill}
                    />
                  ) : (
                    <button
                      onClick={handleCustom}
                      className="w-28 h-10 bg-pink-50 text-green-1000 font-bold text-md tracking-widest"
                    >
                      Custom
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="md:h-24  w-96  pt-10">
              <h3 className={`${grayStyle} mb-2`}>Number of People</h3>
              <div className="bg-pink-50 p-2 py-3 flex justify-around items-center rounded-md">
                <img className="w-6 h-4 rounded-full" src={icon} alt="" />
                <input
                  className={`text-custom-950 bg-pink-50 text-lg font-bold focus:ring  focus:outline-none rounded-md focus:ring-green2-950 ${
                    errors.people ? "border-red-500 border-2" : ""
                  }`}
                  onChange={handleChange}
                  type="number"
                  name="people"
                  value={people}
                  onBlur={(e) => handleBlur(e, "Number of people can't be 0")}
                />
              <p className="text-center text-xs ml-2 md:mx-2 z-50 text-red-500">
                {errors.people && <p className="z-50">{errors.people}</p>}
              </p>
              </div>
            </div>
            <div className="flex items-center -z-10 justify-center my-3 md:mt-12">
              <button
                type="submit"
                className={`bg-custom-950 text-white hover:bg-green2-950 hover:text-custom-950 font-bold w-60 h-2 pb-8 ${
                  bill === 0 ? "cursor-not-allowed" : ""
                }`}
              >
                Calculate
              </button>
            </div>
          </div>
          <Result people={people} calculus={total} reset={reset} />
        </form>
      </div>
    </>
  )
}

export default Home