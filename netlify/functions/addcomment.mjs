export default async (req, context) => {
  const { name, message } = context.params;

  return new Response(`New comment from ${name} in ${message}!`);
};

export const config = {
  path: "/addcomment/:name/:message"
};
