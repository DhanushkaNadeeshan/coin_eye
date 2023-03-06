export default function InputText({ onChange, value, defualtValue ,name=''}) {
  const style = `
        w-full
        border-b-2
        bg-inherit
        text-slate-200
        border-slate-500
        px-2
        focus:outline-none
        focus:border-sky-500
    `;
  return (
    <input
      className={style}
      onChange={onChange}
      defaultValue={defualtValue}
      value={value}
      name={name}
    ></input>
  );
}
