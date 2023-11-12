import { Radio } from "antd";
import styles from "./SettingsPanel.module.css";
import { Button, Input, Space } from "antd";

const timeControlOptions = [
  { label: "без таймера", value: 0 },
  { label: "3 минуты", value: 3 },
  { label: "5 минут", value: 5 },
];

const turnsControlOptions = [
  { label: "без ограничений", value: 10000000000000000 },
  { label: "20 ходов", value: 20 },
  { label: "40 ходов", value: 40 },
];


const fieldSizeOptions = [
  { label: "4x4", value: 16 },
  { label: "4x5", value: 20 },
  { label: "6x6", value: 36 },
];

export default function SettingsPanel({
  onChangeTimeControl,
  onChangeFieldSize,
  timeControl,
  disableChoice,
  fieldSize,
  userName,
  onChangeName,
  onSubmitName,
  showWelcome,
  onChangeTurnsNumber,
  turnsNumber
}) {
  return (
    <div className={styles.wrapper}>
      {showWelcome ? (
        <p>Добро пожаловать, {userName}!</p>
      ) : (
        <div>
          <p>Введите имя:</p>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              onChange={onChangeName}
              value={userName}
              disabled={disableChoice}
            />
            <Button
              onClick={onSubmitName}
              disabled={disableChoice}
              type="default"
            >
              Отправить
            </Button>
          </Space.Compact>
        </div>
      )}
      <div>
        <p>Установить размер поля:</p>
        <Radio.Group
          options={fieldSizeOptions}
          onChange={onChangeFieldSize}
          value={fieldSize}
          optionType="button"
          disabled={disableChoice}
        />
      </div>
      <div>
        <p>Установить таймер игры:</p>
        <Radio.Group
          options={timeControlOptions}
          onChange={onChangeTimeControl}
          value={timeControl}
          optionType="button"
          disabled={disableChoice}
        />
      </div>
      <div>
        <p>Установить ограничение ходов:</p>
        <Radio.Group
          options={turnsControlOptions}
          onChange={onChangeTurnsNumber}
          value={turnsNumber}
          optionType="button"
          disabled={disableChoice}
        />
      </div>
    </div>
  );
}
