# Echo sample


In this sample, we ask the user to enter a sentance and the server will send the same sentance uppercased.

## Model

The first thing we defined is the model. This is used to store all the information used by our application.

The model need to retain 3 informations:
- User input string
- Uppercased string
- Status of the request

```fsharp
type Status =
  | None
  | Pending
  | Done

type Model =
  { InputValue: string
    ServerResponse: string
    Status: Status
  }

  static member Initial =
    { InputValue = ""
      ServerResponse = ""
      Status = None
    }
```

## Actions

There is 4 actions support by the application:

```fsharp
type Actions =
  // User is typing in the textarea
  | ChangeInput of string
  // Send a request to the server
  | SendEcho
  // Updatet the ServerResponse value
  | ServerResponse of string
  // Update the status in the model
  | SetStatus of Status
```

## Update

```fsharp
// Update
let update model action =
  match action with
  // On input change with update the model value
  | ChangeInput str ->
      { model with InputValue = str } ,[]
  // When we got back a server response, we update the value of the server and set the state to Done
  | ServerResponse str ->
      { model with
          ServerResponse = str
          Status = Done }, []
  // Set the status in the model
  | SetStatus newStatus ->
      { model with Status = newStatus }, []
  | SendEcho ->
      let message =
        [ fun h ->
            fakeAjax
              (fun data ->
                h (ServerResponse data)
              )
              model.InputValue
            // We just sent an ajax request so make the state pending in the model
            h (SetStatus Pending)
        ]
      model, message
```

## View

```fsharp
// View
let view model =
  // Choose what we want to display on output
  let resultArea =
    match model.Status with
    | None ->
        span
          []
          [ text "" ]
    | Pending ->
        span
          []
          [ text "Waiting Server response" ]
    | Done ->
        span
          []
          [ text "The server response is:"
            br []
            b
              []
              [ text model.ServerResponse ]
          ]

  div
    [ classy "columns is-flex-mobile" ]
    [ div [ classy "column" ] []
      div
        [ classy "column is-narrow is-narrow-mobile"
          Style [ "width", "400px" ]
        ]
        [ label
            [ classy "label"
              property "for" "input-area"
            ]
            [text "Enter a sentence: "]
          p
            [ classy "control" ]
            [ textarea
                [
                  property "id" "input-area"
                  classy "textarea"
                  onInput ChangeInput
                  property "value" model.InputValue
                ]
                []
            ]
          div
            [ classy "control" ]
            [ p
                []
                [ button
                    [ classy "button"
                      onMouseClick (fun _ -> SendEcho)
                    ]
                    [ text "Uppercase by server" ]
                ]
            ]
          resultArea
        ]
      div [ classy "column" ] []
    ]
```
