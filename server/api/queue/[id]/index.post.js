import { updateQueue } from "~/server/db/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const body = await readBody(event);

  const res = await updateQueue(id, {
    ...body,
  });

  if (res) {
    return res;
  }
});
