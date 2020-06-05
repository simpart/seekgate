# seekgate
A simple thermo checker that runs on Raspberry Pi.

Monitors anything (body temperature, etc..) and warns when the threshold is exceeded.

The concept of this project is to make it possible to build a simple thermo checker at the most affordable cost.

# installation

```
sudo ./setup/setup.sh
```

# usage
start checker
```
sudo sytemctl start seekgate
```
! it does not run the camera immediately, the camera run when anyone accesses by a browser.

please access http://(pi_addr)/seekgate.


stop checker
```
sudo sytemctl stop seekgate
```

# system overview
![system](https://simpart.github.io/seekgate/img/system_overview.png)


