package basic

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestDiv(t *testing.T) {

	t.Run("10/5", func(t *testing.T) {

		a := 10
		b := 5

		expected := 2

		result := Div(a, b)

		assert.Equal(t, expected, result)

	})
	t.Run("10/0", func(t *testing.T) {

		a := 10
		b := 5

		expected := 2

		result := Div(a, b)

		require.Equal(t, expected, result)

	})

}
