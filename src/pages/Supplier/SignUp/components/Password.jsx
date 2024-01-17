import React from 'react';

function Password() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-5">
      <fieldset className="basis-1/2">
        <legend className="font-bold text-[#2C3E50]">
          SENHA
          <span className="text-red-500">*</span>
        </legend>
        <input
          type="password"
          name=""
          id="password"
          className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
        />
      </fieldset>
      <fieldset className="basis-1/2">
        <legend className="font-bold text-[#2C3E50]">
          CONFIRME SUA SENHA
          <span className="text-red-500">*</span>
        </legend>
        <input
          type="password"
          name=""
          id="passwordConfirmation"
          className="border rounded-lg w-full h-10 mt-1 pl-1 border-[#005CA9]"
        />
      </fieldset>
    </div>
  );
}

export default Password;
