export default function InputBar({
  valueText,
  placeholderText,
  labelName,
  handleChange,
  colorWhite,
}: any) {
  return (
    <div className="mt-1 flex items-center justify-between">
      <label
        htmlFor="username"
        className={colorWhite ? "text-white" : "text-black"}
      >
        {labelName}
      </label>
      <input
        className="pl-2 h-9 w-[15rem] rounded bg-gray-200 text-xs text-black"
        type="text"
        id="username"
        name="username"
        placeholder={placeholderText}
        onChange={(e) => handleChange(e.target.value)}
        value={valueText}
        required
      />
    </div>
  );
}
