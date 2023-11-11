import { Radio } from "antd";
import styles from "./SettingsPanel.module.css";

const timeControlOptions = [
  { label: "без таймера", value: 0 },
  { label: "3 минуты", value: 3 },
  { label: "5 минут", value: 5 },
];

// const fieldSizeOptions = [
//     { label: "4x4", value: 16 },
//     { label: "5x5", value: 20 },
//     { label: "6x6", value: 36 },
//   ];

//   const timeTurnControlOptions = [
//     { label: "без таймера", value: 0 },
//     { label: " 5 секунд", value: 3 },
//     { label: "10 секунд", value: 5 },
//   ];

export default function SettingsPanel({ onChangeTimeControl, timeControl, disableChoice }) {



  return (
    <div className={styles.wrapper}>
              {/* <div className="">
        <p>Установить размер поля:</p>
        <Radio.Group
          options={fieldSizeOptions}
          //   onChange={onChangeTimeControl}
          //   value={timeControl}
          optionType="button"
        />
      </div> */}
      <div className="">
        <p>Установить таймер игры:</p>
        <Radio.Group
          options={timeControlOptions}
          onChange={onChangeTimeControl}
          value={timeControl}
          optionType="button"
          disabled={disableChoice}
        />
      </div>
      {/* <div className="">
        <p>Установить таймер хода:</p>
        <Radio.Group
          options={timeTurnControlOptions}
          //   onChange={timeTurnControlOptions}
          //   value={timeControl}
          optionType="button"
        />
      </div> */}
    </div>
  );
}
