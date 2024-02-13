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

		result := Div(a, b)

		assert.Equal(t, 2, result)

	})
	t.Run("10/0", func(t *testing.T) {

		a := 10
		b := 5

		require.Equal(t, a/b, Div(a, b))

	})

}
