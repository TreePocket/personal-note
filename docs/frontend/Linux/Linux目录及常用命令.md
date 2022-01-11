# Linux目录及常用命令

## linux常见目录

| 目录  | 概述                                                         |
| ----- | ------------------------------------------------------------ |
| /bin  | 存放二进制可执行文件，存储所有用户都可使用的基本操作命令     |
| /sbin | super bin目录，存放一些root用户可以使用普通用户不能使用的命令，如ifconfig |
| /etc  | 系统主要配置文件目录                                         |
| /usr  | Unix system resource（unix系统资源目录) 用于存放系统应用程序 |
| /dev  | device系统硬件设备目录                                       |
| /home | 存放所有用户文件的根目录，例如user用户的主目录就是/home/user 用~user表示 |
| /opt  | 额外安装的可选应用程序包放置的位置 一般把应用程序安装在这里 如tomcat |
| /proc | 虚拟文件系统目录，是系统内存的映射。可以直接访问这个目录来获取系统信息 |
| /root | 系统管理员的根目录                                           |
| /mnt  | 存放临时的映射文件系统，我们常把软驱和光驱挂装在这里的floppy和cdrom子目录下 |
| /boot | 系统启动核心目录，用于储存系统启动文件                       |
| /lib  | 系统资源文件类库目录。存放跟⽂件系统中的程序运⾏所需要的共享库及内核模块。共享库⼜叫动态链接共享库，作⽤类似windows⾥的.dll⽂件，存放了根⽂件系统程序运⾏所需的共享⽂件。 |
| /tmp  | 存放临时文件的目录                                           |
| /var  | variable 可变的、易变的 该目录存储的文件经常会发生变化（增加、修改、删除）经常用于部署项目程序（php）文件 |

## Linux常用命令

#### ls

查询目录中的内容  ls [选项] [文件或者目录]

选项：

-a 显示所有文件，包括隐藏文件

-l 显示详细信息

-d 查看目录本身的属性而非子文件

-i 显示inode 

```
文件类型和权限
d-rw-r--r--
第一位文件类型 -文件  d目录  l软链接文件
2-4位 代表u(所有者)权限
5-7位 代表g(所属组)权限
8-10位 代表o(其他人)权限
r(read)读取、w(write)写入、x(execute)执行
```

### 文件处理命令

#### mkdir

创建目录

mkdir -p [目录名]

选项:

-p: 递归创建

#### cd

切换所在目录

cd [目录]

- ~ 家目录
- -前一次访问目录
- . 当前目录
- ..上级目录

ps:相对路径是参照当前所在目录  绝对路径是从根目录开始

#### pwd

显示当前目录

#### rmdir

删除目录

#### rm

删除文件或目录

选项：

-r 删除目录

-f 强制删除

rm -rf [文件或者目录] 递归强制删除所有目录

#### cp

复制命令

cp [源文件或者目录] [目标文件]

选项:

-r 若给出的源文件是一个目录文件，此时将复制该目录下所有的子目录和文件

-p 除复制文件的内容外，还把修改时间和访问权限也复制到新文件中

-d 复制时保留链接。这里所说的链接相当于Windows系统中的快捷方式

-a 相当于 -rpd

-f 覆盖已经存在的目标文件而不给出提示

#### mv

移动文件或者改名

mv [源文件或者目录] [目标文件]

### 文件搜索命令

#### locate

- 在后台数据库中按文件名搜索，速度比较快

- 数据保存在/var/lib/mlocate 后台数据库，每天更新一次

- 可以updatedb命令立即更新数据库

- 只能搜索文件名

建立索引的配置文件

```
/etc/updatedb.conf
```

```
PRUNE_BIND_MOUNTS = "yes" 全部⽣效，开启搜索限制
PRUNEFS 不搜索的⽂件系统
PRUNENAMES 忽略的⽂件类型
PRUNEPATHS 忽略的路径 /tmp
```

#### whereis

搜索命令所在路径以及帮助文档所在位置

Whereis 命令名

```
whereis ls
```

-b 只查找可执行文件

-m 只查找帮助文件

#### find

- 文件搜索命令
- find [搜索范围] [搜索条件]

按名称搜索(避免大范围的搜索，会非常消耗资源)

```
find / -name a.log
```

通配符

- *匹配任意内容
- ?匹配任意一个字符
- []匹配任意一个中括号内的字符

```
find . -name "ab[cdef]"
```

不区分大小写

```
find / -iname "ab[cef]"
```

按所有者进行搜索 -u

```
find /root -user root
find /root -nouser
```

#### grep

- 在文件当中匹配符合条件的字符串
- grep "1" README.md
  - -i 忽略大小写
  - -v 排除指定字符串

find命令：在系统当中搜索符合条件的文件名，如果需要匹配，使用通配符匹配，通配符是完全匹配

grep命令：在文件中搜索符合条件的字符串，如果需要匹配，使用正则表达式进行匹配



### 网络管理

#### Ifconfig & ip

查看和配置网络基本信息

```
ip [ OPTIONS ] OBJECT { COMMAND | help }
```

OBJECT 为常用对象，值可以是以下几种

```
OBJECT={ link | addr | addrlabel | route | rule | neigh | ntable | tunnel | maddr | mroute | mrule | monitor | xfrm | token }
```

常用对象的取值含义如下：

- link：网络设备
- address：设备上的协议（IP或IPv6）地址
- addrlabel：协议地址选择的标签配置
- route：路由表条目
- rule：路由策略数据库中的规则

OPTIONS 为常用选项，值可以是以下几种：

```
OPTIONS={ -V[ersion] | -s[tatistics] | -d[etails] | -r[esolve] | -h[uman-readable] | -iec | -f[amily] { inet | inet6 | ipx | dnet | link } | -o[neline] | -t[imestamp] | -b[atch] [filename] | -rc[vbuf] [size] }
```

常用选项的取值含义如下：

- -V：显示命令的版本信息；
- -s：输出更详细的信息；
- -f：强制使用指定的协议族；
- -4：指定使用的网络层协议是IPv4协议
- -6：指定使用的网络层协议是IPv6协议；
- -0：输出信息每条记录输出一行，即使内容较多也不换行显示；
- -r：显示主机时，不使用IP地址，而使用主机的域名。
- help 为该命令的帮助信息。

```sh
ip link show                     # 显示网络接口信息
ip link set eth0 up             # 开启网卡
ip link set eth0 down            # 关闭网卡
ip link set eth0 promisc on      # 开启网卡的混合模式
ip link set eth0 promisc offi    # 关闭网卡的混个模式
ip link set eth0 txqueuelen 1200 # 设置网卡队列长度
ip link set eth0 mtu 1400        # 设置网卡最大传输单元
ip addr show     # 显示网卡IP信息
ip addr add 192.168.0.1/24 dev eth0 # 设置eth0网卡IP地址192.168.0.1
ip addr del 192.168.0.1/24 dev eth0 # 删除eth0网卡IP地址

ip route show # 显示系统路由
ip route add default via 192.168.1.254   # 设置系统默认路由
ip route list                 # 查看路由信息
ip route add 192.168.4.0/24  via  192.168.0.254 dev eth0 # 设置192.168.4.0网段的网关为192.168.0.254,数据走eth0接口
ip route add default via  192.168.0.254  dev eth0        # 设置默认网关为192.168.0.254
ip route del 192.168.4.0/24   # 删除192.168.4.0网段的网关
ip route del default          # 删除默认路由
ip route delete 192.168.1.0/24 dev eth0 # 删除路由
```

用ip命令显示网络设备的运行状态:

```sh
ip link list
```

显示更加详细的设备信息：

```sh
ip -s link list
```

#### tracerout

排查网络故障

#### ss | netstat

找到占用网络端口的进程

```sh
netstat -an | grep ":80"
```



### 压缩

#### zip

- 压缩文件:  zip 压缩文件名 源文件
- 压缩目录: zip -r 压缩文件名 源目录
- 解压: unzip 压缩文件名

#### gzip

| 命令                      | 示例                         | 含义                                    |
| ------------------------- | ---------------------------- | --------------------------------------- |
| gzip 源文件               | gzip a.txt                   | 压缩为.gz格式的压缩文件，源文件会消失   |
| gzip -c 源文件 > 压缩文件 | gzip -c yum.txt > yum.txt.gz | 压缩为.gz格式的压缩⽂件，源⽂件不会消失 |
| gzip -r 目录              | gzip -r xx                   | 压缩目录下的所有子文件，但是不压缩目录  |
| gzip -d 压缩文件名        | gzip -d yum.txt.gz           | 解压缩文件,不保留压缩包                 |
| gunzip 压缩文件           | gunzip yum.txt.gz            | 解压缩文件，不保留压缩包                |

#### tar

tar 是用来建立，还原备份文件的工具程序，它可以加入，解开备份文件内的文件

压缩文件 非打包

```sh
# touch a.c       
# tar -czvf test.tar.gz a.c   //压缩 a.c文件为test.tar.gz
a.c
```

列出压缩文件内容

```sh
# tar -tzvf test.tar.gz 
-rw-r--r-- root/root     0 2010-05-24 16:51:59 a.c
```

解压文件

```sh
# tar -xzvf test.tar.gz 
a.c
```



### 关机重启

#### w

查看登录⽤户信息

```sh
 wupengfei@MacBook-Pro> w
 8:14  up 1 day,  8:53, 2 users, load averages: 2.19 1.93 1.84
USER     TTY      FROM              LOGIN@  IDLE WHAT
wupengfei console  -                二23   32:36 -
wupengfei s002     -                 8:14       - w
```

- USER 登录的⽤户名
- TTY 登录的终端 tty1 本地终端 pts/0远程终端
- FROM 登录的IP
- LOGIN 登录时间
- IDLE ⽤户闲置时间
- JCPU 该终端所有进程占⽤的时间
- PCPU 当前进程所占⽤的时间
- WHAT 正在执⾏的命令

#### who

查看登录⽤户信息

- USER 登录的⽤户名
- TTY 登录的终端 tty1 本地终端 pts/0远程终端
- LOGIN 登录时间(登录的IP)

#### last

查看当前登录和过去登录的⽤户信息 默认读取 /var/log/wtmp ⽂件

#### lastlog

查看所有用户的最后一次登录时间



### vi常用

[Esc]退出编辑模式

:w 保存

:w! 若文件属性为只读时，强制写入。是否写入成功与用户对该文件权限有关

:q 退出

:q! 强制退出不保存

:! 强制保存

:ls 列出所有的文件

:n 下一个

:N 上一个

:行数  跳到指定行

/xxx 从光标位置开始向后搜索xxx字符串

?xxx 从光标位置开始向前搜索

h 左移光标

l 右移光标

j 下移光标

k 上移光标 

[vim命令](https://imgbed-1258988615.cos.ap-nanjing.myqcloud.com/blog-img/linux-img/vim_hotkey.png)

### 切换用户

#### su

```sh
su root
```

#### 安装文件

#### rpm

Linux rpm 命令用于管理套件。

rpm（英文全拼：redhat package manager） 原本是 Red Hat Linux 发行版专门用来管理 Linux 各项套件的程序，由于它遵循 GPL 规则且功能强大方便，因而广受欢迎。逐渐受到其他发行版的采用。RPM 套件管理方式的出现，让 Linux 易于安装，升级，间接提升了 Linux 的适用度。

举例：

```
rpm -ivh packagename  #直接安装
rpm --force -ivh packagename.rpm #忽略报错，强制安装
```

选项：

-a:查询所有套件

-b<完成阶段><套件档>+或-t <完成阶段><套件档>+：设置包装套件的完成阶段，并指定套件档的文件名称；

-c：只列出组态配置文件，本参数需配合"-l"参数使用

-d：只列出文本文件，本参数需配合"-l"参数使用

-e<套件档>或--erase<套件档>：删除指定的套件

-f<文件>+：查询拥有指定文件的套件

-h或--hash：套件安装时列出标记

-i：显示套件的相关信息

-i<套件档>或--install<套件档>：安装指定的套件档

-l：显示套件的文件列表

-p<套件档>+：查询指定的RPM套件档

-q：使用询问模式，当遇到任何问题时，rpm指令会先询问用户

-R：显示套件的关联性信息

-s：显示文件状态，本参数需配合"-l"参数使用

-U<套件档>或--upgrade<套件档>：升级指定的套件档

-v：显示指令执行过程

-vv：详细显示指令执行过程，便于排错

### 查看进程

#### ps

-e 显示所有进程

-f 全格式

-u 不显示标题

-l 长格式

-w 宽输出

a 显示终端上所有进程，包含其他用户的进程

r 只显示正在运行的进程

u 以用户为主的格式来显示程序的状况

x 显示所有程序，不以终端机来区分

```
ps -ef
```

ps -ef 是用标准的格式显示进程，其格式如下：

UID //用户ID，但输出的是用户名

PID //进程的ID

PPID //父进程ID

C //进程占用CPU的百分比

STIME //进程启动到现在的时间

TTY //该进程在哪个终端上运行，若与终端无关，显示？ 若pts/0等，则表示由网络连接主机进程

CMD //命令的名称和参数

```
ps aux
```

同ps -ef 不同的有列有

- USER //用户名

- %CPU //进程占用的CPU百分比

- %MEM //占用内存的百分比

- VSZ //该进程使用的虚拟內存量（KB）

- RSS //该进程占用的固定內存量（KB）（驻留中页的数量）

- STAT //进程的状态

- START //该进程被触发启动时间

- TIME //该进程实际使用CPU运行的时间

其中STAT状态位常见的状态字符有

- D //无法中断的休眠状态（通常 IO 的进程)
- R //正在运行可中在队列中可过行的
- S //处于休眠状态
- T //停止或被追踪
- W //进入内存交换 （从内核2.6开始无效
- X //死掉的进程 （基本很少见）

- Z //僵尸进程
- < //优先级高的进程
- N //优先级较低的进程
- L //有些页被锁进内存
- s //进程的领导者（在它之下有子进程）
- l //多线程，克隆线程（使用 CLONE_THREAD, 类似 NPTL pthreads）
- [+] //位于后台的进程组

### 传输文件

#### scp

选项：

-v 显示进度

-r 递归处理

-C 压缩选项

-P 选择端口

macos上传

```sh
scp -r local_folder remote_username@remote_ip:remote_folder
```

macos下载

```sh
scp -r remote_username@remote_ip:remote_folder local_folder
```

