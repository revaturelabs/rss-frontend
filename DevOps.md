## DevOps Configuration
* Jenkins Location: (URL has been removed for security reasons)
* All 5 repositories have been configured to 
  * Build ONLY on the `dev` branch
  * Build and Deploy ONLY on the `master` branch
* Please use the following table to communcate with the Hosted RSS
  * (With the root URL being (URL has been removed for security reasons))
| Service | Port | Comments |
| ------- | ---- | -------- |
| Evaluation | 10000 | Deployed |
| Account | 10001 | Configured, but tests fail => Not Deployed |
| Cart | 10002 | Deployed |
| Inventory | 10003 | Configured, but tests fail => Not Deployed |
| Frontend | 9000 | Deployed |
