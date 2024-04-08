import { updateQueue } from "~/server/db/queue";

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;

  const body = await readBody(event);

  updateQueue(id, {
    ...body,
  });
});
