import LifeCalendar from "@repo/ui/LifeCalendar";

export const Standard = () => (
  <div style={{width: "100%"}}>
    <LifeCalendar currentAge={25} />
  </div>
)

export default {
  title: "LifeCalendar",
  component: LifeCalendar,
};
