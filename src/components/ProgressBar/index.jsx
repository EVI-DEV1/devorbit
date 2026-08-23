import { Track, Fill, Row, Label, Value } from "./styles";

/*
 * Barra de progresso reutilizável (cursos, drawer, Top 5).
 *  <ProgressBar value={80} label="React" />
 */
const ProgressBar = ({ value = 0, label, showValue = true, color, height }) => {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0));

  return (
    <div>
      {(label || showValue) && (
        <Row>
          {label && <Label>{label}</Label>}
          {showValue && <Value>{safeValue}%</Value>}
        </Row>
      )}

      <Track
        $height={height}
        role="progressbar"
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <Fill style={{ width: `${safeValue}%` }} $color={color} />
      </Track>
    </div>
  );
};

export { ProgressBar };
