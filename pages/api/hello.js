// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

// export default async function handler(req, res) {
//   const { name, message } = req.body
 
//   try {
//     await handleFormInputAsync({ name, message })
//     res.redirect(307, '/')
//   } catch (err) {
//     res.status(500).send({ error: 'failed to fetch data' })
//   }
// }