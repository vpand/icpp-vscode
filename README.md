# ICPP-VSCode
Interpreting C++ in vscode with the [icpp](https://github.com/vpand/icpp) backend, and writes the execution result into the Output/ICPP channel.

## ICPP - Running C++ in anywhere like a script
**Interpreting C++, executing the source and executable like a script.**
 * Writing powerful script using C++ just as easy as Python;
 * Writing hot-loading C++ script code in running process;
 * Based on [Unicorn Engine](https://github.com/unicorn-engine/unicorn.git) qemu virtual cpu and [Clang/LLVM](https://github.com/llvm/llvm-project.git) C++ compiler;
 * Integrated internally with [Standard C++23](https://en.cppreference.com/w/cpp/23) and [Boost](https://github.com/boostorg/boost.git) libraries;
 * To reuse the existing C/C++ library as an icpp module extension is extremely simple.

Copyright (c) vpand.com 2024.

## Comparison
|*|Source|Executable|Package|Memory Resident|Remote|
|-|-|-|-|-|-|
| **ICPP** | **C++** | **ARM64/X86_64** Object | **imod** for *.icpp | **iopad**/**icpp-gadget** | **icpp-server** |
| **Cling** | C++ | **LLVM-IR** Bitcode |  N/A | N/A | N/A | 
| **LLI** | C++ | **LLVM-IR** Bitcode |  N/A | N/A | N/A | 
| **WASM** | C++ | **WebAssembly** Bitcode |  N/A | N/A | N/A | 
| **Python** | Python | Bytecode | pip for *.wheel | N/A | N/A | 
| **Frida** | JavaScript | Bytecode | N/A | frida/frida-gadget | frida-server |

## Scenarios
**Using ICPP to write C++ code just as a script.** Write and then run directly, no creating project, no configuring build, no compiling and linking...

No matter if you're a beginner or an expert with C++, ICPP is suitable for you. With ICPP, you can focus on:
 * Writing **snippet code** to study any of the newest C++ features;
 * Writing **glue script** to do some tasks;
 * Writing **test code** before applying to the formal project;
 * Writing **sample code** to study some new third C/C++ libraries;
 * Making native plugin development scriptable, i.e., **writing plugin using C++ dynamically**.
 * Tracing, profiling, performance optimizing;
 * And so on...

**ICPP, make programming all in one.**

## Status
### Implementation
| OS           | C/C++ Source | Executable Binary | X86_64 on AArch64 | AArch64 on X86_64 |
| :----------  | :--------:   | :------------: | :---------------: | :---------------: |
| **Windows**  | &#10004;     | &#10008;       | &#10008;          | &#10008;          |
| **macOS**    | &#10004;     | &#10008;       | &#10008;          | &#10008;          |
| **Linux**    | &#10004;     | &#10008;       | &#10008;          | &#10008;          |
| **Android**    | &#10004;     | &#10008;       | &#10008;          | &#10008;          |
| **iOS**    | &#10004;     | &#10008;       | &#10008;          | &#10008;          |

### Platform
 * Microsoft: Windows x86_64 >= **10**, Windows arm64 >= **11**;
 * Apple: macOS x86_64 >= **10.15**, macOS arm64 >= **11.3**;
 * iOS: iOS arm64 >= **10.0**;
 * Linux: **Ubuntu** x86_64/aarch64 >= **22.04**;
 * Android: Android x86_64/arm64-v8a >= **platform 25**; 

## Issue
If you encounter any problems when using icpp, before opening an issue, please check the [Bug Report](https://github.com/vpand/icpp/blob/main/.github/ISSUE_TEMPLATE/bug_report.md) template, and provide as many details as you can. Only if we can reproduce the problem, we can then solve it.

## Wiki
You can visit the [Wiki](https://github.com/vpand/icpp/wiki) for a brief description.

## Manual
 * [icpp](https://github.com/vpand/icpp/blob/main/doc/icpp.md): A local C++ source compiler, a LLVM code style formatter, an interpreter and a REPL used to interpret C++ directly;
 * [icpp api](https://github.com/vpand/icpp/blob/main/doc/icppapi.md): Some util wrapper functions or some core functions exported from the icpp runtime interpreter, aiming at simplifying writing C++ script code.
 * [iopad](https://github.com/vpand/icpp/blob/main/doc/iopad.md): A local C++ source compiler driver, an object launch pad and a REPL for the remote icpp-gadget;
 * [imod](https://github.com/vpand/icpp/blob/main/doc/imod.md): An icpp module package manager tool used to install, uninstall and show the third-party modules;
 * [icpp-gadget](https://github.com/vpand/icpp/blob/main/doc/icpp-gadget.md): A remote memory resident daemon which may run inside an Android/iOS process, waiting for iopad to send the interpretable object to execute;
 * [icpp-server](https://github.com/vpand/icpp/blob/main/doc/icpp-server.md): A remote server daemon which loads icpp-gadget as its C++ interpreter, waiting for iopad to send the interpretable object to execute;
