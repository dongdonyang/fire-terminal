// todo 删除钱确认按钮
import { Dialog } from "vant";
export function beforeDel(val) {
  let message = `确定删除${val}？`;
  let dia = Dialog.confirm({
    message
  });
  dia.catch(() => {
    // on cancel
  });
  return dia;
}
