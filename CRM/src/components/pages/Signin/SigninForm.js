import React, { useState } from "react";
import { Button } from "antd";

function SigninForm({ handleChange, handleSubmit, state, loading }) {
  const [value, setValue] = useState({ hidden: true });

  const toggleShow = () => {
    setValue({ hidden: !value.hidden });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div
        className="illustration"
        onClick={toggleShow}
        style={{ cursor: "pointer", color: "#ffff" }}
      >
        {value.hidden ? (
          <i className="fa fa-eye-slash" />
        ) : (
          <i className="fa fa-eye" />
        )}
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          placeholder="email"
          name="email"
          onChange={handleChange}
          value={state.email}
          required
        />
      </div>

      <div className="form-group">
        <input
          type={value.hidden ? "password" : "text"}
          className="form-control"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={state.password}
          required
        />
      </div>

      <div className="form-group check-group">
        <input
          type="checkbox"
          id="checkbox"
          onClick={toggleShow}
          defaultChecked={!value.hidden}
        />
        <label htmlFor="checkbox" className="checkbox-label">
          Show password
        </label>
      </div>
      <div className="form-group">
        <Button
          className="btn btn-primary btn-block"
          htmlType="submit"
          loading={loading}
        >
          Log In
        </Button>
      </div>
    </form>
  );
}

export default SigninForm;
