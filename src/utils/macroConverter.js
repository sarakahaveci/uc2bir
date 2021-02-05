import { Material } from 'components';

const macroConverter = (data, setData, val) => {
  return val.type === 'radio'
    ? Material[val.type]({
        id: val.name,
        name: val.name,
        type: val.type,
        label: val.text,
        required: val.required,
        onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }),
        autoComplete: 'off',
        items: val.items ? val.items : [],
      })
    : val.type === 'select'
    ? Material[val.type]({
        id: val.name,
        name: val.name,
        type: val.type,
        label: val.text,
        required: val.required,
        onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }),
        autoComplete: 'off',
        icon: val.icon,
        items: val.items ? val.items : [],
      })
    : val.type !== 'checkbox'
    ? Material[val.type]({
        id: val.name,
        name: val.name,
        type: val.type,
        label: val.text,
        required: val.required,
        onChange: (e) => setData({ ...data, [e.target.name]: e.target.value }),
        autoComplete: 'off',
        icon: val.icon,
      })
    : Material[val.type]({
        id: val.name,
        name: val.name,
        required: val.required,
        type: val.type,
        label: val.text,
        onChange: (e) =>
          setData({ ...data, [val.name]: e.target.checked ? 1 : 0 }),
        checked: data[val.name] ? true : false,
      });
};

export default macroConverter;
