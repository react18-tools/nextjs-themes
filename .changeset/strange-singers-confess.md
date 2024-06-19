---
"nextjs-themes": patch
---

Apps not setting moduleResolution to Node16 or NodeNext are failing to build as they don't respect exports field. Fix by adding one level of nexting inside nextjs folder
