interface InputProps {
  label: string;
  options: string[];
  setOption: any;
  value: string;
}

export const Select = ({ value, label, options, setOption }: InputProps) => {
  var camalize = function camalize(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={label.toLowerCase().split(" ").join("-")}
        className="text-xs text-gray-300"
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => setOption(e)}
        id={label.toLowerCase().split(" ").join("-")}
        className="bg-black rounded-md border border-gray-800 p-2 outline-none focus:border-gray-500 focus:ring-0"
      >
        {options.map((opt, index) => (
          <option key={index} value={camalize(opt)}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
