import Database from 'bun:sqlite'
import { Option } from '../app/types/dataTypes'

export let optionsDb: Buffer

export const insertOptionsToDB = async (options: Option[]) => {
  // Open SQLite database
  const db = Database.open(':memory:', { create: true })

  // Create Options table
  db.exec(
    `CREATE TABLE IF NOT EXISTS Options (
      Title TEXT,
      Desc TEXT,
      Note TEXT,
      Type TEXT,
      DefaultVal TEXT,
      Example TEXT,
      DeclaredBy TEXT,
      DeclaredByLink TEXT
    )`,
  )

  // Prepare insert statement
  const insertStmt =
    db.prepare(`INSERT INTO Options (Title, Desc, Note, Type, DefaultVal, Example, DeclaredBy, DeclaredByLink) 
                                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)

  // Insert data into Options table
  options.forEach(option => {
    insertStmt.run(
      option.title,
      option.desc,
      option.note,
      option.type,
      option.default,
      option.example,
      option.declared_by,
      option.declared_by_link,
    )
  })

  // Finalize the insert statement
  insertStmt.finalize()

  optionsDb = db.serialize()

  console.info(
    `🦊 The application is now fully prepared. The Options table has been successfully created.`,
  )
  // Close the database connection
  db.close()
}
