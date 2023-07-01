
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useEffect, useState } from "react";
import styles from "./SortingFilter.module.scss";

export const SortingFilter = ({ type, category, onSelectionChange }) => {
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    setSelectValue("");
  }, [type, category]);

  const handleSelectChange = (value) => {
    // Split field and _order from value
    const [field, order] = value.split(".");

    onSelectionChange(field, order);

    setSelectValue(value);
  };

  return (
    <div className={styles.dropdown}>
      <span className={styles.text}>Sort by</span>
      <Select
        defaultValue=""
        style={{ width: 200 }}
        size="large"
        onChange={handleSelectChange}
        value={selectValue}
      >
        <Option value="">Default</Option>
        <Option value="price.asc">Price ASC</Option>
        <Option value="price.desc">Price DESC</Option>
        <Option value="rating.asc">Rating ASC</Option>
        <Option value="rating.desc">Rating DESC</Option>
      </Select>
    </div>
  );
};
