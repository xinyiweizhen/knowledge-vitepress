# Flutter

## **处理用户输入与表单**

### 第一部分：基础 - `TextField` 与 `TextEditingController`

`TextField` 是最基础的文本输入框。想要控制和获取它的内容，你离不开 `TextEditingController`。

**核心概念**:
*   `TextField`: 屏幕上供用户输入的 UI 组件。
*   `TextEditingController`: `TextField` 的“大脑”和“数据线”。它连接着你的业务逻辑和 UI，让你能：
    *   **获取**输入框的当前文本 (`controller.text`)。
    *   **设置**输入框的文本 (`controller.text = 'new value'`)。
    *   **监听**文本变化 (`controller.addListener(...)`)。

#### 如何获取输入？

**方法1：使用 `TextEditingController` (推荐)**

这是最常用、最灵活的方式，尤其是在需要实时响应或在其他地方访问输入值时。

```dart
// 1. 在 StatefulWidget 的 State 中创建 Controller
class _MyFormState extends State<MyForm> {
  // 创建 controller，并在 dispose 中释放资源
  late final TextEditingController _nameController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: _nameController, // 2. 将 controller 绑定到 TextField
          decoration: InputDecoration(labelText: 'Enter your name'),
        ),
        SizedBox(height: 20),
        ElevatedButton(
          onPressed: () {
            // 3. 在任何地方通过 controller 获取值
            final name = _nameController.text;
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Hello, $name')),
            );
          },
          child: Text('Submit'),
        ),
      ],
    );
  }
}
```
**关键点**:
1.  在 `initState` 中创建 `TextEditingController`。
2.  在 `dispose` 方法中调用 `controller.dispose()` **释放资源**，防止内存泄漏。这是 **必须** 的步骤。

**方法2：使用 `onChanged`**

当输入内容发生变化时，这个回调会立即触发。适用于需要实时反馈的场景，比如搜索框。

```dart
String _name = '';

TextField(
  onChanged: (value) {
    // 每次输入变化都会更新 _name
    setState(() {
      _name = value;
    });
    print('Current input: $_name');
  },
  //...
)
```

**方法3：使用 `onSubmitted`**

当用户完成输入（例如，点击键盘上的“完成”或“前往”按钮）时触发。

```dart
TextField(
  onSubmitted: (value) {
    // 仅在提交时处理
    print('Submitted value: $value');
  },
  //...
)
```

---

### 第二部分：整体管理 - `Form` 与 `TextFormField`

当你有多个输入框，并且需要对它们进行统一的**验证**和**保存**时，`Form` 就是你的最佳选择。

**核心概念**:
*   `Form`: 一个容器 Widget，可以管理其内部的所有 `FormField`。
*   `TextFormField`: 一个特殊的 `TextField`，它已经集成了 `FormField` 的功能。可以直接在 `Form` 中使用。
*   `GlobalKey<FormState>`: `Form` 的“遥控器”。通过这个 `Key`，你可以调用 `Form` 的方法，如验证 (`validate()`) 和保存 (`save()`)。

#### 如何实现表单验证与保存？

这是一个包含用户名和密码的经典登录表单示例。

```dart
class LoginForm extends StatefulWidget {
  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  // 1. 创建一个 GlobalKey 来唯一标识 Form
  final _formKey = GlobalKey<FormState>();

  String _email = '';
  String _password = '';

  void _submit() {
    // 2. 验证表单
    //    validate() 会触发所有 TextFormField 的 validator
    if (_formKey.currentState!.validate()) {
      // 3. 如果验证通过，保存表单
      //    save() 会触发所有 TextFormField 的 onSaved
      _formKey.currentState!.save();

      // 在这里处理登录逻辑
      print('Email: $_email');
      print('Password: $_password');
      // ... 调用 API
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey, // 4. 将 key 绑定到 Form
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(labelText: 'Email'),
            keyboardType: TextInputType.emailAddress,
            // 5. 定义验证逻辑 (validator)
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your email.';
              }
              if (!value.contains('@')) {
                return 'Please enter a valid email.';
              }
              return null; // 返回 null 表示验证通过
            },
            // 6. 定义保存逻辑 (onSaved)
            onSaved: (value) {
              _email = value!;
            },
          ),
          TextFormField(
            decoration: InputDecoration(labelText: 'Password'),
            obscureText: true, // 隐藏密码
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your password.';
              }
              if (value.length < 6) {
                return 'Password must be at least 6 characters.';
              }
              return null;
            },
            onSaved: (value) {
              _password = value!;
            },
          ),
          ElevatedButton(
            onPressed: _submit,
            child: Text('Login'),
          )
        ],
      ),
    );
  }
}
```
**工作流程**:
1.  用户点击 "Login" 按钮，触发 `_submit` 方法。
2.  `_formKey.currentState!.validate()` 被调用。
3.  `Form` 遍历其所有的 `FormField`（这里是两个 `TextFormField`），并执行每个组件的 `validator` 回调。
4.  **如果任何一个 `validator` 返回了非 `null` 的字符串**，该字符串会作为错误信息显示在对应的输入框下方，并且 `validate()` 方法返回 `false`。
5.  **如果所有 `validator` 都返回 `null`**，`validate()` 方法返回 `true`。
6.  代码继续执行 `_formKey.currentState!.save()`。
7.  `Form` 再次遍历所有 `FormField`，并执行每个组件的 `onSaved` 回调，将输入框的最终值赋给你的本地变量 (`_email`, `_password`)。
8.  执行后续的登录逻辑。

---

### 第三部分：自定义实现 vs. 使用库

现在你已经掌握了原生的方法，我们来讨论一个更高级的话题：什么时候该自己写，什么时候该用库？

#### 自定义实现 (原生 `Form`)

*   **优点**:
    *   **零依赖**: 无需引入任何第三方包，轻量级。
    *   **完全可控**: 你对每一行代码都有完全的控制权。
    *   **学习曲线平缓**: 对于简单表单，概念清晰，易于上手。
*   **缺点/开发中会遇到的问题**:
    *   **样板代码多**: 每个表单都需要创建 `GlobalKey`，为每个字段写 `validator` 和 `onSaved`，管理状态变量 (`_email`, `_password` 等)。
    *   **状态管理复杂**: 当表单逻辑复杂时（例如，某些字段的可见性依赖于其他字段的值），你需要用 `setState` 手动管理 UI 更新，代码会变得混乱。
    *   **实时验证麻烦**: 原生的 `validate()` 是在提交时触发。如果想实现“用户输入时实时验证”，你需要结合 `onChanged` 和 `autovalidateMode`，这会增加复杂性。
    *   **数据模型分离不佳**: 输入值直接保存在 `State` 类的变量中，UI 和数据模型耦合较紧。

**适用场景**:
简单的登录、注册、设置页面，字段数量少，验证逻辑直接。

#### 使用优秀的库 (如 `flutter_form_builder`)

`flutter_form_builder` 是社区中最受欢迎、最强大的表单库之一。它极大地简化了表单的创建和管理。

*   **优点**:
    *   **代码极大简化**: 大幅减少样板代码。你只需要声明字段，库会帮你处理控制器、状态和值的获取。
    *   **内置丰富字段**: 提供了大量预制好的表单字段，如日期选择器、下拉菜单、单选/复选框、图片选择器等，开箱即用。
    *   **强大的验证器**: 内置了常用的验证规则（`required`, `email`, `minLength` 等），并支持自定义和组合。
    *   **状态管理解耦**: 将表单状态与 UI 分离，更容易管理复杂表单。
    *   **易于获取数据**: 可以轻松将整个表单的值导出为一个 `Map`。

*   **缺点/开发中会遇到的问题**:
    *   **学习曲线**: 需要花时间学习库的 API 和概念（如 `FormBuilder`, `FormBuilderTextField` 等）。
    *   **依赖问题**: 引入第三方库意味着你的项目依赖于它的维护和更新。
    *   **定制性限制**: 尽管库很灵活，但对于一些极端自定义的需求，可能会受到库本身设计的限制。

#### 使用 `flutter_form_builder` 实践

让我们用 `flutter_form_builder` 重写上面的登录表示例，感受一下它的威力。

**1. 添加依赖**:
```yaml
# pubspec.yaml
dependencies:
  flutter_form_builder: ^9.2.0
  form_builder_validators: ^9.1.0 # 配套的验证器库
```

**2. 实现代码**:
```dart
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';

class LoginFormWithBuilder extends StatelessWidget {
  final _formKey = GlobalKey<FormBuilderState>();

  @override
  Widget build(BuildContext context) {
    return FormBuilder( // 使用 FormBuilder
      key: _formKey,
      child: Column(
        children: [
          FormBuilderTextField( // 使用 FormBuilderTextField
            name: 'email', // 1. 直接指定字段名
            decoration: InputDecoration(labelText: 'Email'),
            // 2. 使用内置验证器，像搭积木一样组合
            validator: FormBuilderValidators.compose([
              FormBuilderValidators.required(),
              FormBuilderValidators.email(),
            ]),
          ),
          FormBuilderTextField(
            name: 'password',
            decoration: InputDecoration(labelText: 'Password'),
            obscureText: true,
            validator: FormBuilderValidators.compose([
              FormBuilderValidators.required(),
              FormBuilderValidators.minLength(6),
            ]),
          ),
          ElevatedButton(
            onPressed: () {
              // 3. 验证并保存
              if (_formKey.currentState!.saveAndValidate()) {
                // 4. 直接获取整个表单的值，是一个 Map
                final formData = _formKey.currentState!.value;
                print(formData); // 输出: {email: user@example.com, password: user_password}
                // 在这里处理登录逻辑
              }
            },
            child: Text('Login'),
          )
        ],
      ),
    );
  }
}
```
**对比原生实现的优势**:
*   不再需要手动创建 `TextEditingController` 并 `dispose`。
*   不再需要为每个字段创建本地变量 (`_email`) 和写 `onSaved`。
*   验证逻辑更清晰、更可复用。
*   通过 `_formKey.currentState!.value` 一行代码就能获取所有数据，格式清晰。

### 总结与建议

| 场景 | 推荐方案 | 理由 |
| :--- | :--- | :--- |
| **快速学习/小型项目** | **原生 `Form`** | 轻量，无依赖，足以满足简单需求，是理解 Flutter 表单机制的基础。 |
| **中大型项目/复杂表单** | **`flutter_form_builder` 等库** | 大幅提升开发效率，减少样板代码，代码更健壮、易维护，内置功能丰富。 |
| **需要实时验证/动态表单** | **`flutter_form_builder` 等库** | 提供了更优雅的方案来处理实时验证和动态增删字段等复杂场景。 |

**我的个人建议是**：
1.  **务必先掌握原生 `Form` 和 `TextEditingController` 的用法**。这是基础，理解了它的工作原理，你才能更好地理解和调试任何表单问题，无论是否使用库。
2.  在实际项目中，**对于任何超过 3-4 个字段的表单，或者需要复杂验证逻辑的场景，果断使用 `flutter_form_builder`**。
3. 它为你节省的时间和精力，远超过学习它本身所需付出的成本。这会让你把更多精力集中在业务逻辑而非繁琐的表单状态管理上。
