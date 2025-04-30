* Formulas and columns can either have a new name, or a new expression. You cannot change both, unless migrating or updating the worksheet two times.

* It is not possible to reverse the join direction in the TML script.

* You cannot create new tables using Scriptability. You can only update existing tables.

* You can only change logical tables using Scriptability. You cannot change the physical version of the table that exists in a database. When you change the `column_name`, for example, the name changes in the application, but not in the physical table in the database.

* You cannot import manually compressed .zip files. You can only import .zip files that you exported from ThoughtSpot: a custom SpotApp, an object and its associated data sources, or multiple objects of the same type that you exported from the object list page.

* You cannot create Scriptable representations of R- or Python-powered visualizations.

* You can only view and modify joins at the table level in the source table TML. You cannot view or modify table-level joins from the destination table's TML file.

* You cannot modify joins at the table level from the Worksheet or View  TML file. You can only change the joins for that specific Worksheet or View. To modify table-level joins, you must edit the source table's TML file.

* You cannot use TML to remove columns or tables from an Embrace connection. You can only add them.
