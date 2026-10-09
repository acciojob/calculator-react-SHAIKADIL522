import React, { useState } from "react";
import "./../styles/App.css";

const BAD = ["Infinity", "-Infinity", "NaN", "Error"];

const App = () => {
  const [expr, setExpr] = useState("");

  const press = (v) =>
    setExpr((prev) => (BAD.includes(prev) ? "" : prev) + v);

  const clear = () => setExpr("");

  const equals = () => {
    let e = expr.trim();
    if (!e || BAD.includes(e)) return;
    if (!/^[0-9+\-*/.]+$/.test(e)) return setExpr("Error");

    // 007 -> 7 (avoid legacy octal), keeps 0.5 and 1.05
    e = e.replace(/(^|[^\d.])0+(\d)/g, "$1$2");

    try {
      const result = new Function("return " + e)();
      setExpr(String(parseFloat(Number(result).toFixed(10))));
    } catch (err) {
      setExpr("Error");
    }
  };

  const key = (label, onClick, cls = "") => (
    <button className={`key ${cls}`} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div className="calculator">
      <div className="display">{expr}</div>

      {key("C", clear, "c")}
      {key("/", () => press("/"), "div")}
      {key("*", () => press("*"), "mul")}
      {key("-", () => press("-"), "sub")}

      {key("7", () => press("7"))}
      {key("8", () => press("8"))}
      {key("9", () => press("9"))}
      {key("+", () => press("+"), "plus")}

      {key("4", () => press("4"))}
      {key("5", () => press("5"))}
      {key("6", () => press("6"))}

      {key("1", () => press("1"))}
      {key("2", () => press("2"))}
      {key("3", () => press("3"))}
      {key("=", equals, "eq")}

      {key("0", () => press("0"))}
      {key(".", () => press("."))}
      <div className="blank" />
    </div>
  );
};

export default App;