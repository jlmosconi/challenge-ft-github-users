jest.mock('@gorhom/bottom-sheet', () => {
  const {ScrollView, TextInput} = jest.requireActual('react-native')

  return {
    ...require('@gorhom/bottom-sheet/mock'),
    __esModule: true,
    BottomSheetScrollView: ScrollView,
    BottomSheetTextInput: TextInput,
  }
})
